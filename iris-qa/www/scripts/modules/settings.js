/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['const/settings', 'modules/storage'], function (manifest, storage) {
    var settings = undefined;
    var keys = [];
    var hasSettings = false;

    var getKeys = function () {
        for (key in manifest) {
            keys.push(key);
        }
        return keys;
    };

    var init = function () {
        keys = keys.length != 0 ? keys : getKeys();
    };

    var checkStorage = function () {
        var settings = {};
        var stored_keys = 0;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            settings[key] = storage.getItem(key);
        }
        return settings;
    };

    init();

    return {
        getSettings: function () {
            settings = settings || checkStorage();
            return settings;
        },
        setSettings: function (object) {
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                settings[key] = object[key];
            }
            storage.storeFields(object);
        },
        checkSettingsAvailable: function () {
            var a = true;
            for (var i = 0; i < this.keys.length; i++) {
                a = this.settings.hasOwnProperty(this.keys[i]) && a;
            }
            return a;
        },

        hasSettings: function () {
            var stored_keys = 0;
            this.getSettings();

            for (var i = 0; i < keys.length; i++) {
                if (settings.hasOwnProperty(keys[i])) {
                    stored_keys = settings[key] !== null ? stored_keys + 1 : stored_keys;
                }
            }

            hasSettings = stored_keys == keys.length;

            return hasSettings;
        },
        get: function (name) {

            var s = this.getSettings();

            return s.hasOwnProperty(name) ? s[name] : undefined;
        },
        getStoredKeys: function () {
            return keys;
        }
    };



});