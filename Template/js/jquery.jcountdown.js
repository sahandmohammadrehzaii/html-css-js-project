/* jCountdown 1.4.3 jQuery Plugin Copyright 2012 Tom Ellis http://www.webmuse.co.uk | MIT Licensed (license.txt) */
(function (e) {
    e.fn.countdown = function (t) {
        var n = {
            date: null,
            updateTime: 1e3,
            htmlTemplate: "%d <span class='cd-time'>روز</span> %h <span class='cd-time'>ساعت</span> %i <span class='cd-time'>دقیقه</span> %s <span class='cd-time'>ثانیه</span>",
            minus: !1,
            onChange: null,
            onComplete: null,
            onResume: null,
            onPause: null,
            leadingZero: !1,
            offset: null,
            servertime: null,
            hoursOnly: !1,
            minsOnly: !1,
            secsOnly: !1,
            weeks: !1,
            hours: !1,
            yearsAndMonths: !1,
            direction: "down",
            stopwatch: !1
        }, r = Array.prototype.slice, i = window.clearInterval, s = Math.floor, o = 36e5, u = 31556926, a = 2629743.83, f = 604800, l = 86400, c = 3600, h = 60, p = 1, d = /(%y|%m|%w|%d|%h|%i|%s)/g, v = /%y/, m = /%m/, g = /%w/, y = /%d/, b = /%h/, w = /%i/, E = /%s/, S = function (e) {
            var t = new Date, n = e.data("jcdData");
            return n ? (n.offset !== null ? t = x(n.offset) : t = x(null, n.difference), t.setMilliseconds(0), t) : new Date
        }, x = function (e, t) {
            var n, r, i, s = new Date;
            return e === null ? r = s.getTime() - t : (n = e * o, i = s.getTime() - -s.getTimezoneOffset() / 60 * o + n, r = s.setTime(i)), new Date(r)
        }, T = function () {
            var e = this, t, n, r, o, x, T, N, C, k, L, A, O = "", M, _ = function (e) {
                var t;
                return t = s(M / e), M -= t * e, t
            }, D = e.data("jcdData");
            if (!D)return !1;
            t = D.htmlTemplate, n = S(e), r = D.dateObj, r.setMilliseconds(0), o = D.direction === "down" ? r.getTime() - n.getTime() : n.getTime() - r.getTime(), M = Math.round(o / 1e3), C = _(l), k = _(c), L = _(h), A = _(p), D.yearsAndMonths && (M += C * l, x = _(u), T = _(a), C = _(l)), D.weeks && (M += C * l, N = _(f), C = _(l)), D.hoursOnly && (k += C * 24, C = 0), D.minsOnly && (L += k * 60 + C * 24 * 60, C = k = 0), D.secsOnly && (A += L * 60, C = k = L = 0), D.yearsLeft = x, D.monthsLeft = T, D.weeksLeft = N, D.daysLeft = C, D.hrsLeft = k, D.minsLeft = L, D.secLeft = A, A === 60 && (A = 0), D.leadingZero && (C < 10 && !D.hoursOnly && (C = "0" + C), x < 10 && (x = "0" + x), T < 10 && (T = "0" + T), N < 10 && (N = "0" + N), k < 10 && (k = "0" + k), L < 10 && (L = "0" + L), A < 10 && (A = "0" + A)), D.direction === "down" && (n < r || D.minus) || D.direction === "up" && (r < n || D.minus) ? (O = t.replace(v, x).replace(m, T).replace(g, N), O = O.replace(y, C).replace(b, k).replace(w, L).replace(E, A)) : (O = t.replace(d, "00"), D.hasCompleted = !0), e.html(O).trigger("change.jcdevt", [D]).trigger("countChange", [D]), D.hasCompleted && (e.trigger("complete.jcdevt").trigger("countComplete"), i(D.timer)), e.data("jcdData", D)
        }, N = {
            init: function (t) {
                var r = e.extend({}, n, t), i, s;
                return this.each(function () {
                    var n = e(this), o = {}, u;
                    n.data("jcdData") && (n.countdown("changeSettings", t, !0), r = n.data("jcdData"));
                    if (r.date === null)return e.error("No Date passed to jCountdown. date option is required."), !0;
                    s = new Date(r.date), s.toString() === "Invalid Date" && e.error("Invalid Date passed to jCountdown: " + r.date), s = null, r.onChange && n.on("change.jcdevt", r.onChange), r.onComplete && n.on("complete.jcdevt", r.onComplete), r.onPause && n.on("pause.jcdevt", r.onPause), r.onResume && n.on("resume.jcdevt", r.onResume), o = e.extend({}, r), o.originalHTML = n.html(), o.dateObj = new Date(r.date), o.hasCompleted = !1, o.timer = 0, o.yearsLeft = o.monthsLeft = o.weeksLeft = o.daysLeft = o.hrsLeft = o.minsLeft = o.secLeft = 0, o.difference = null;
                    if (r.servertime !== null) {
                        var a;
                        i = new Date, a = e.isFunction(o.servertime) ? o.servertime() : o.servertime, o.difference = i.getTime() - a, a = null
                    }
                    u = e.proxy(T, n), o.timer = setInterval(u, o.updateTime), n.data("jcdData", o), u()
                })
            }, changeSettings: function (t, n) {
                return this.each(function () {
                    var r = e(this), s, o, u = e.proxy(T, r);
                    if (!r.data("jcdData"))return !0;
                    s = e.extend({}, r.data("jcdData"), t), t.hasOwnProperty("date") && (o = new Date(t.date), o.toString() === "Invalid Date" && e.error("Invalid Date passed to jCountdown: " + t.date)), s.hasCompleted = !1, s.dateObj = new Date(t.date), i(s.timer), r.off(".jcdevt").data("jcdData", s), n || (s.onChange && r.on("change.jcdevt", s.onChange), s.onComplete && r.on("complete.jcdevt", s.onComplete), s.onPause && r.on("pause.jcdevt", s.onPause), s.onResume && r.on("resume.jcdevt", s.onResume), s.timer = setInterval(u, s.updateTime), r.data("jcdData", s), u()), s = null
                })
            }, resume: function () {
                return this.each(function () {
                    var t = e(this), n = t.data("jcdData"), r = e.proxy(T, t);
                    if (!n)return !0;
                    t.data("jcdData", n).trigger("resume.jcdevt", [n]).trigger("countResume", [n]);
                    if (!n.hasCompleted) {
                        n.timer = setInterval(r, n.updateTime);
                        if (n.stopwatch && n.direction === "up") {
                            var i = S(t).getTime() - n.pausedAt.getTime(), s = new Date;
                            s.setTime(n.dateObj.getTime() + i), n.dateObj = s
                        }
                        r()
                    }
                })
            }, pause: function () {
                return this.each(function () {
                    var t = e(this), n = t.data("jcdData");
                    if (!n)return !0;
                    n.stopwatch && (n.pausedAt = S(t)), i(n.timer), t.data("jcdData", n).trigger("pause.jcdevt", [n]).trigger("countPause", [n])
                })
            }, complete: function () {
                return this.each(function () {
                    var t = e(this), n = t.data("jcdData");
                    if (!n)return !0;
                    i(n.timer), n.hasCompleted = !0, t.data("jcdData", n).trigger("complete.jcdevt").trigger("countComplete", [n]).off(".jcdevt")
                })
            }, destroy: function () {
                return this.each(function () {
                    var t = e(this), n = t.data("jcdData");
                    if (!n)return !0;
                    i(n.timer), t.off(".jcdevt").removeData("jcdData").html(n.originalHTML)
                })
            }, getSettings: function (t) {
                var n = e(this), r = n.data("jcdData");
                return t && r ? r.hasOwnProperty(t) ? r[t] : undefined : r
            }
        };
        if (N[t])return N[t].apply(this, r.call(arguments, 1));
        if (typeof t == "object" || !t)return N.init.apply(this, arguments);
        e.error("Method " + t + " does not exist in the jCountdown Plugin")
    }
})(jQuery)