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
    this.data = null;
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
        if (!action) {
            if (callbacks.length === 0) {
                return array[0];
            }
            var retorno = this.toList();
            return retorno[0];
        }
        action = { handler: action, type: "f" };
        callbacks.push(action);
        var retorno = this.toList(true);
        callbacks.pop();
        return retorno.length > 0 ? {} : retorno;
    };
    this.last = function () {
        /// <summary>Retorna o último membro da lista</summary>
        var retorno = this.toList();
        return retorno[retorno.length - 1];
    };
    this.slice = array.slice.bind(array);
    this.any = function (action) {
        /// <summary>Retorna true caso tenha um item com o filtro selecionado</summary>
        /// <param name="action" type="bool function(item){}"></param>
        /// <returns type="List" />
        callbacks.push({ handler: action, type: "a" });
        var retorno = this.toList(true);
        callbacks.pop();
        return retorno === undefined ? false : (retorno !== true ? false : true);
    };
    this.where = function (action) {
        /// <summary>Filtra a lista</summary>
        /// <param name="action" type="bool function(item){}"></param>
        /// <returns type="List" />
        var _callbacks = callbacks.slice();
        _callbacks.push({ handler: action, type: "w" });
        return new List(array.slice(), _callbacks);
    };
    this.select = function (action) {
        /// <summary>Retorna uma lista onde cada item é o retorno do método</summary>
        /// <param name="action" type="object function(item, i){}"></param>
        /// <returns type="List" />
        var _callbacks = callbacks.slice();
        _callbacks.push({ handler: action, type: "s" });
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

        var _callbacks = callbacks.slice();
        _callbacks.push({ handler: action, type: "d", args: arguments });
        return new List(array.slice(), _callbacks);
    };
    this.each = function (action) {
        /// <summary>Percorre item a item da lista</summary>
        /// <param name="action" type="object function(item, i){}"></param>
        callbacks.push({ handler: action, type: "e" });
        this.toList(false);
    };
    var switchObject = {
        "a": function (func, item) {
            var retorno = func(item);
            if (retorno === true) this.a = this.r = true;
            else return item;
        },
        "d": function (func, item, index, args, data) {
            var key = typeof (args[0]) == "function" ? args[0](item) : item;
            var value = data[key];
            return !value ? data[key] = item : null;
        },
        "e": function (func, item, index) {
            func(item, index);
            return item;
        },
        "f": function (func, item) {
            var retorno = func(item);
            if (retorno === true) {
                this.r = item;
                return this.a = true;
            } else {
                return item;
            }
        },
        "s": function (func, item, index) {
            var _output = this;
            return func(item, index);
        },
        "w": function (func, item, index) {
            return func(item, index) ? item : null;
        },
    };
    this.toList = function (hasOutput) {
        /// <signature>
        /// <returns type="Array" />
        /// </signature>
        var output = [];
        var i = 0;
        data = {}; //reset callbacks data
        for (; i < array.length; i++) {
            var j = 0,
                item = array[i],
                _item = item,
                stopAny = { a: false, r: null };

            if (callbacks.length > 0) {
                for (; j < callbacks.length; j++) {
                    var func = callbacks[j];
                    _item = switchObject[func.type].apply(stopAny, [func.handler, _item, i, func.args || null, !data[j] ? (data[j] = {}) : data[j]]);
                    if (stopAny.a) {
                        if (stopAny.r) {
                            return stopAny.r;
                        }
                        break;
                    }

                    if (!_item) break;
                }
            }
            if (hasOutput !== false && _item) output.push(_item);
        }
        if (hasOutput === false) return;
        return output;
    };
    this.toString = array.toString();
};
