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
        var retorno = this.toList(true);
        return retorno === undefined ? false : (retorno !== true ? false : true);
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
    this.distinct = function (action) {
        /// <signature>
        ///     <summary>Retorna os ítens distintos</summary>
        ///     <param name="action" type="function(item, i){}">Método para definir a propriedade que define o distinto</param>
        ///     <returns type="List" />
        /// </signature>
        /// <signature>
        ///     <summary>Retorna os ítens distintos</summary>
        ///     <returns type="List" />
        /// </signature>
        var obj = {};
        if (!action) {
            action = function (item) {
                return item;
            };
        }
        _action = function (item) {
            var key = action(item);
            var retorno = !!this[key];
            return retorno === true ? false : (this[key] = true);
        }.bind(obj);
        _action._type = "w";
        var _callbacks = callbacks.slice();
        _callbacks.push(_action);

        return new List(array.slice(), _callbacks);
    };
    this.each = function (action) {
        /// <param name="action" type="object function(item, i){}"></param>
        action._type = "e";
        callbacks.push(action);
        this.toList(false);
    };
    var switchObject = {
        "a": function (func, item) {
            var retorno = func(item);
            if (retorno === true) this.a = this.r = true;
            else return item;
        },
        "d": function (func, item) {

        },
        "e": function (func, item) {
            func(item);
            return item;
        },
        "s": function (func, item) {
            var _output = this;
            return func(item);
        },
        "w": function (func, item) {
            return func(item) ? item : null;
        },
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