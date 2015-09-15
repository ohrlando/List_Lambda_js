List = function (array, inheritCallbacks) {
    /// <signature>
    ///     <summary>Lista para mais performance que o Array</summary>
    ///     <param name="array" type="Array">inicializa a lista com um array</param>
    /// </signature>
    /// <signature>
    ///     <summary>Lista para mais performance que o Array</summary>
    /// </signature>
    var that = this;
    if (inheritCallbacks === undefined && array === undefined) array = [];

    this.toArray = function () {
        if (callbacks.length === 0) {
            return array;
        }
        return this.toList();
    };
    var callbacks = inheritCallbacks || [];
    this.add = array.push.bind(array);
    this.addRange = function (array2) {
        if (array2 instanceof List) {
            array.push.apply(array, array2.toArray());
        } else {
            array.push.apply(array, array2);
        }
    };
    this.remove = function (index) {
        array.splice(index, 1);
    };
    this.first = function (action) {
        if (!action)
            return array[0];
        var i = -1;
        while (++i < array.length) {
            if (action(array[i])) return array[i];
        }
        return {};
    };
    this.last = function () {
        return array[array.length - 1]
    };
    this.slice = array.slice.bind(array);
    this.any = function (action) {
        /// <param name="action" type="bool function(item){}"></param>
        /// <returns type="List" />
        action._type = "a";
        callbacks.push(action);
        var retorno = this.toList(false);
        return retorno === undefined ? false : retorno;
    };
    this.where = function (action) {
        /// <param name="action" type="bool function(item){}"></param>
        /// <returns type="List" />
        action._type = "w";
        var _callbacks = callbacks.slice();
        _callbacks.push(action);
        return new List(array.slice(), _callbacks);
    };
    this.select = function (action) {
        /// <param name="action" type="object function(item, i){}"></param>
        /// <returns type="List" />
        action._type = "s";
        var _callbacks = callbacks.slice();
        _callbacks.push(action);
        return new List(array.slice(), _callbacks);
    };
    this.each = function (action) {
        /// <param name="action" type="object function(item, i){}"></param>
        action._type = "e";
        callbacks.push(action);
        this.toList(false);
    };
    var switchObject = {
        "w": function (func, item) {
            return func(item) ? item : null;
        },
        "s": function (func, item) {
            var _output = this;
            return func(item);
        },
        "e": function (func, item) {
            func(item);
            return item;
        },
        "a": function (func, item) {
            var retorno = func(item);
            if (retorno === true) this.a = this.r = true;
            else return item;
        }
    };
    this.toList = function (hasOutput) {
        /// <signature>
        /// <returns type="Array" />
        /// </signature>
        var output = [];
        var i = 0;
        for (; i < array.length; i++) {
            var j = 0,
                item = array[i],
                _item = item,
                stopAny = {
                    a: false,
                    r: null
                };
            for (; j < callbacks.length; j++) {
                var func = callbacks[j];
                _item = switchObject[func._type].apply(stopAny, [func, _item]);
                if (stopAny.a) {
                    if (stopAny.r) {
                        return stopAny.r;
                    }
                    break;
                }

                if (!_item) break;
            }
            if (hasOutput !== false && _item) output.push(_item);
        }
        if (hasOutput === false) return;
        return output;
    };
    this.toString = array.toString();
};