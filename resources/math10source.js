var chess = function() {
        function newPGNHeader() {
            var e = bAI ? "HTMLChess" : "?";
            for (var t in oGameInfo) delete oGameInfo[t];
            oGameInfo.Event = "No name match", oGameInfo.Site = document.domain || "?", oGameInfo.Date = (new Date).toLocaleDateString(), oGameInfo.Round = bAI ? String(iRound++) : "1", flagHumanBlack ? (oGameInfo.White = e, oGameInfo.Black = "Human") : (oGameInfo.White = "Human", oGameInfo.Black = e), oGameInfo.Result = "*", updatePGNHeader()
        }

        function isThreatened(e, t, o) {
            for (var a, n = !1, i = 0; 8 > i; i++) {
                for (var r = 0; 8 > r; r++)
                    if (a = etc.aBoard[10 * i + r + 21], a > 0 && (8 & a) === o && etc.isValidMove(r, i, e, t)) {
                        n = !0;
                        break
                    }
                if (n) break
            }
            return n
        }

        function getInCheckPieces() {
            var e, t, o, a = !0,
                n = kings[1 ^ flagWhoMoved >> 3];
            bCheck = isThreatened(n % 10 - 1, (n - n % 10) / 10 - 2, flagWhoMoved), etc.aThreats.splice(0);
            for (var i = 21; 99 > i; i += 8 > i % 10 ? 1 : 3) {
                if (e = i % 10 - 1, t = (i - i % 10) / 10 - 2, o = etc.aBoard[i], a && o > 0 && (8 ^ 8 & o) === flagWhoMoved)
                    for (var r = 21; 99 > r; r += 8 > r % 10 ? 1 : 3)
                        if (etc.isValidMove(e, t, r % 10 - 1, (r - r % 10) / 10 - 2)) {
                            a = !1;
                            break
                        }(!bCheck || 2 === (7 & o)) && o > 0 && (8 ^ 8 & o) === flagWhoMoved && isThreatened(e, t, flagWhoMoved) && etc.aThreats.push(i)
            }
            if (a) {
                if (bCheck) {
                    var s = flagWhoMoved ? "Black" : "White";
                    oGameInfo.Result = flagWhoMoved ? "0-1" : "1-0", sendMsg((oGameInfo.hasOwnProperty(s) ? oGameInfo[s] : s) + " wins.", "The king is threatened and can not move (<em>checkmate</em>).", 1e4), sMovesList = sMovesList.replace(/\+$/, "#")
                } else oGameInfo.Result = "1/2-1/2", sendMsg("Drawn game", "The opponent can not move (<em>draw</em>).", 1e4);
                bGameNotOver = !1
            } else if (oGameInfo.hasOwnProperty("Result") && oGameInfo.Result.search(/^(\d+\-\d+)$/) > -1 && iHistPointr === aHistory.length - 1) {
                var s = "1-0" === oGameInfo.Result.valueOf() ? "White" : "Black";
                sendMsg((oGameInfo.hasOwnProperty(s) ? oGameInfo[s] : s) + " wins.", "The opponent has withdrawn.", 1e4), bGameNotOver = !1
            } else oGameInfo.Result = "*", bGameNotOver = !0
        }

        function getPcByParams(e, t) {
            var o = aParams[e];
            return 2 === (7 & o) && (kings[1 & e >> 3] = t), o
        }

        function resetBoard() {
            var e = 0;
            nFrstFocus = fourBtsLastPc = nPawnStride = lastStart = lastEnd = 0, flagWhoMoved = 8, iHistPointr = -1, aHistory.splice(0), etc.aThreats.splice(0);
            for (var t = 1; 121 > t; t++) etc.aBoard[t - 1] = t % 10 ? 2 > t / 10 % 10 | 2 > t % 10 ? 7 : 4 & t / 10 ? 0 : 16 | getPcByParams(e++, t - 1) : 7;
            sMovesList = new String, oMovesSelect.innerHTML = "<option>Game start</option>", oMovesSelect.selectedIndex = 0
        }

        function trimHistory() {
            sMovesList = sMovesList.substr(0, sMovesList.search(new RegExp((1 ^ 1 & iHistPointr ? " \\w+(\\=\\w+)?" : "¶" + String(iHistPointr + 4 >> 1) + "\\.\\s.*") + (iHistPointr === aHistory.length - 2 ? "$" : "")))), aHistory.splice(iHistPointr + 1), oGameInfo.Result = "*"
        }

        function writeHistory(e, t, o, a, n, i) {
            var r, s, l = aHistory.length >> 1,
                d = new String,
                c = o % 10 - 1,
                u = (o - o % 10) / 10 - 2,
                h = t % 10 - 1,
                f = (t - t % 10) / 10 - 2,
                m = !1,
                g = !1,
                p = t | o << 7 | a << 14 | n << 19,
                B = !1,
                v = 1 === (7 & a) && 1 & t + o && 0 === n || n > 0,
                b = 8 & a;
            lastStart = t, lastEnd = o, 9 === (9 | u + 1) && 1 === (7 & a) && (B = i || 22 - etc.nPromotion ^ b, p |= B << 24, d = "=" + "NBRQ".charAt(7 & B - 3)), aHistory.push(p), 2 === (7 & a) && (kings[b >> 3] = o);
            for (var C = 21; 99 > C; C += 8 > C % 10 ? 1 : 3) {
                var w = etc.aBoard[C];
                (15 & w) === (15 & a) && C !== o && (etc.aBoard[o] = 0, r = C % 10 - 1, s = (C - C % 10) / 10 - 2, etc.isValidMove(r, s, c, u) && (r === h ? g = !0 : m = s === f ? !0 : !0), etc.aBoard[o] = B || 15 & a)
            }
            sMovesList += b ? " " : (l ? "¶" : "") + String(l + 1) + ". ", sMovesList += 2 === (7 & a) && 4 === (4 | o - t + 2) ? "O-O" + (2 === t - o ? "-O" : "") : (1 !== (7 & a) ? "KNBRQ".charAt(7 & a - 2) : "") + (1 === (7 & a) && v || m ? String.fromCharCode(96 + t % 10) : "") + (g ? String(f + 1) : "") + (v ? "x" : "") + String.fromCharCode(96 + o % 10) + String(u + 1) + d + (bCheck ? "+" : ""), oMovesSelect.innerHTML = "<option>Game start</option><option>" + sMovesList.replace(/¶/g, "</option><option>") + "</option>", oMovesSelect.selectedIndex = oMovesSelect.length - 1, updatePGNLink(), e && (getInCheckPieces(), etc.bSolidView && oSolidBoard.move(!1, t, o, n, B)), iHistPointr++
        }

        function consider(e, t, o, a, n, i) {
            var r, s, l, d, c, u, h, f, m, g, p, B, v, b, C = a,
                w = -1e8,
                S = 78 - o << 10,
                H = flagWhoMoved ? -10 : 10;
            flagWhoMoved ^= 8, iSquare++, u = e || i && i >= o && consider(0, 0, 0, 21, 0, 0) > 1e4;
            do
                if ((s = etc.aBoard[h = C]) && (p = 15 & s ^ flagWhoMoved, 7 > p)) {
                    g = 2 & p-- ? 8 : 4, v = 15 & s - 9 ? thnkU[p] : 57;
                    do
                        if (B = etc.aBoard[h += aParams[v]], !e | h === e && (f = p | h + H - n ? 0 : n, !B & (!!p | 3 > g || !!f) || (15 & B + 1 ^ flagWhoMoved) > 9 && p | g > 2)) {
                            if (m = !(7 & B - 2)) return flagWhoMoved ^= 8, etc.aBoard[iSquare--] = C, S;
                            for (b = r = 15 & s, c = 15 & etc.aBoard[h - H], l = p | c - 7 ? r : (r += 2, 6 ^ flagWhoMoved); l >= r;) {
                                if (d = B ? aParams[32 | 7 & B] - o - p : 0, i && (d += (1 - p ? aParams[(h - h % 10) / 10 + 37] - aParams[(C - C % 10) / 10 + 37] + aParams[h % 10 + 38] * (p ? 1 : 2) - aParams[C % 10 + 38] + (16 & s) / 2 : 9 * !!m) + (p ? 0 : !(etc.aBoard[h - 1] ^ r) + !(etc.aBoard[h + 1] ^ r) + aParams[32 | 7 & r] - 99 + 99 * !!f + (2 > g)) + !(9 ^ (c ^ flagWhoMoved))), i > o || i > 1 & i === o && d > 15 | u) {
                                    if (etc.aBoard[h] = r, etc.aBoard[C] = m ? (etc.aBoard[f] = etc.aBoard[m], etc.aBoard[m] = 0) : f ? etc.aBoard[f] = 0 : 0, d -= consider(i > o | u ? 0 : h, d - w, o + 1, etc.aBoard[iSquare + 1], b = p | g > 1 ? 0 : h, i), !(o || i - 1 | nFrstFocus - C | fourBtsLastPc - r | h - nScndFocus | -1e4 > d)) return iSquare--, writeHistory(!0, C, h, s, B), nPawnStride = b;
                                    b = p - 1 | 7 > g || m || !i | u | B | 15 > s || consider(0, 0, 0, 21, 0, 0) > 1e4, etc.aBoard[C] = s, etc.aBoard[h] = B, m ? (etc.aBoard[m] = etc.aBoard[f], etc.aBoard[f] = 0) : f ? etc.aBoard[f] = 9 ^ flagWhoMoved : 0
                                }
                                if (d > w || i > 1 && d == w && !o && Math.random() < .5) {
                                    if (etc.aBoard[iSquare] = C, i > 1) {
                                        if (o && 0 > t - d) return flagWhoMoved ^= 8, iSquare--, d;
                                        o || (fourBtsLastPc = r, nFrstFocus = C, nScndFocus = h)
                                    }
                                    w = d
                                }
                                r += b || (f = h, m = C > h ? f - 3 : f + 2, etc.aBoard[m] < 15 | etc.aBoard[m + C - h] || etc.aBoard[h += h - C]) ? 1 : 0
                            }
                        }
                    while (!B & p > 2 || (h = C, p | g > 2 | s > 15 & !B && v++ * --g))
                }
            while (C++ > 98 ? C = 20 : a - C);
            return flagWhoMoved ^= 8, iSquare--, w + 1e8 && w > -S + 1924 | u ? w : 0
        }

        function engineMove() {
            consider(0, 0, 0, 21, nPawnStride, nPlyDepth), consider(0, 0, 0, 21, nPawnStride, 1), etc.bFlatView && writeFlatPieces(), bReady = !0
        }

        function writeFlatPieces() {
            for (var e, t, o, a, n, i = 0; 64 > i; i++) o = 10 * (i >> 3) - (7 & i) + 28, t = aFlatSquares[etc.bBlackSide ? i : 63 - i], e = etc.aBoard[o], t.innerHTML = 0 === e ? "" : "<span>&#98" + "171216151413231822212019".substr((3 * (15 & e) + (7 & e) >> 1) - 2, 2) + ";</span>", t.style.backgroundColor = o === lastStart || o === lastEnd ? 1 & (11 * o - o % 10) / 10 ? "#c0a1a1" : "#e8c9c9" : "";
            if (!bAI || flagHumanBlack !== flagWhoMoved)
                for (var r = 0; r < etc.aThreats.length; r++) a = etc.aThreats[r], n = (4 * a - 9 * (a % 10)) / 5, aFlatSquares[etc.bBlackSide ? n - 8 : 71 - n].style.backgroundColor = 1 & (11 * a - a % 10) / 10 ? "#adafce" : "#dadcfb";
            nFrstFocus = 0
        }

        function squareFocus(e, t) {
            var o = aFlatSquares[etc.bBlackSide ? ((e - e % 10) / 10 - 1 << 3) - e % 10 : (9 - (e - e % 10) / 10 << 3) - 1 + e % 10];
            t && (sLstSqColr = o.style.backgroundColor), o.style.backgroundColor = t ? "#4cff4c" : sLstSqColr
        }

        function createFlatCoord(e, t) {
            var o = document.createElement("th");
            return o.className = t ? "vertCoords" : "horizCoords", o.innerHTML = t ? e : String.fromCharCode(97 + e), o
        }

        function updateFlatCoords() {
            for (var e = 0; 8 > e; e++) aCoords[e].innerHTML = aCoords[16 | e].innerHTML = String.fromCharCode(etc.bBlackSide ? 104 - e : 97 + e), aCoords[8 | e].innerHTML = aCoords[24 | e].innerHTML = String(etc.bBlackSide ? e + 1 : 8 - e)
        }

        function showFlatBoard() {
            if (oBoardTable) updateFlatCoords(), etc.bFlatView || (etc.oFlatVwArea.appendChild(oBoardTable), etc.bFlatView = !0);
            else {
                aCoords = [], aFlatSquares = [], oBoardTable = document.createElement("table");
                var e, t, o, a, n, i = document.createElement("tbody"),
                    r = document.createElement("td");
                e = document.createElement("tr"), r.className = "boardAngle", e.appendChild(r);
                for (var s = 0; 8 > s; s++) t = createFlatCoord(etc.bBlackSide ? 7 - s : s, !1), aCoords.push(t), e.appendChild(t);
                e.appendChild(r.cloneNode(!1)), i.appendChild(e);
                for (var l = 0; 8 > l; l++) {
                    e = document.createElement("tr"), o = createFlatCoord(etc.bBlackSide ? l + 1 : 8 - l, !0), aCoords[8 | l] = o, e.appendChild(o);
                    for (var d = 0; 8 > d; d++) a = 91 - 10 * l + d, n = document.createElement("td"), n.className = 1 & a + (a - a % 10) / 10 ? "blackSquares" : "whiteSquares", n.id = "flatSq" + a, n.onclick = getSqFnc, aFlatSquares.push(n), e.appendChild(n);
                    o = createFlatCoord(etc.bBlackSide ? l + 1 : 8 - l, !0), aCoords[24 | l] = o, e.appendChild(o), i.appendChild(e)
                }
                e = document.createElement("tr"), e.appendChild(r.cloneNode(!1));
                for (var s = 0; 8 > s; s++) t = createFlatCoord(etc.bBlackSide ? 7 - s : s, !1), aCoords[16 | s] = t, e.appendChild(t);
                e.appendChild(r.cloneNode(!1)), i.appendChild(e), oBoardTable.appendChild(i), oBoardTable.id = "flatChessboard", oBoardTable.style.width = String(nFlatBoardSide) + "px", oBoardTable.style.height = String(nFlatBoardSide) + "px", etc.oFlatVwArea.appendChild(oBoardTable), etc.bFlatView = !0
            }
            writeFlatPieces()
        }

        function runComponents() {
            if (graphicsStatus++, 15 === graphicsStatus) {
                try {
                    etc.aPiecesLab = new Function("return [function() {" + etc.aFncBodies.slice(0, 6).join("}, function() {") + "}];")(), new Function(etc.aFncBodies.slice(6, 12).join("\n"))(), updateViewSize(!0, !1), oSolidBoard = new Function(etc.aFncBodies[12]).call(etc)
                } catch (e) {
                    alert("Sorry, but your browser does not support 3D canvas.")
                }
                etc.aFncBodies.splice(0), document.body.removeChild(etc.oCurtain), delete etc.aFncBodies, delete etc.oCurtain, oBoardsBox.style.width = nDeskWidth + "px"
            }
        }

        function loadCom(e) {
            0 !== graphicsStatus && (etc.aFncBodies[e] = this.responseText, runComponents())
        }

        function showSolidBoard() {
            0 === graphicsStatus ? (graphicsStatus = 1, etc.oCurtain = document.createElement("div"), etc.oCurtain.id = "chessCurtain", etc.oCurtain.innerHTML = '<div id="chessLoading">Loading&hellip;</div>', document.body.appendChild(etc.oCurtain), etc.aFncBodies = [null, null, null, null, null, null, null, null, null, null, null, null, null], XHR("meshes/board.json", function() {
                0 !== graphicsStatus && (etc.tmp3DBoard = eval("(" + this.responseText + ")"), runComponents())
            }), XHR("meshes/pawn.jscn", loadCom, 0), XHR("meshes/king.jscn", loadCom, 1), XHR("meshes/knight.jscn", loadCom, 2), XHR("meshes/bishop.jscn", loadCom, 3), XHR("meshes/rook.jscn", loadCom, 4), XHR("meshes/queen.jscn", loadCom, 5), XHR("canvas3dengine/scene.jsfb", loadCom, 6), XHR("canvas3dengine/vec3.jsfb", loadCom, 7), XHR("canvas3dengine/matrix3.jsfb", loadCom, 8), XHR("canvas3dengine/camera.jsfb", loadCom, 9), XHR("canvas3dengine/mesh.jsfb", loadCom, 10), XHR("canvas3dengine/light.jsfb", loadCom, 11), XHR("solidView.jsfb", loadCom, 12)) : (updateViewSize(!0, !0), oSolidBoard.show())
        }

        function updatePGNHeader() {
            sPGNHeader = new String;
            for (var e in oGameInfo) sPGNHeader += "[" + e + ' "' + oGameInfo[e] + '"]\n'
        }

        function updatePGNLink() {
            oPGNBtn.setAttribute("href", "data:application/x-chess-pgn;US-ASCII," + escape(sPGNHeader + "\n" + sMovesList.replace(/¶/g, " ") + (aHistory.length > 0 ? " " : "") + oGameInfo.Result))
        }

        function runAlgebraic(e, t, o) {
            try {
                var a, n, i, r, s = 0;
                if ("O-O" === e || "O-O-O" === e) nCastlType = "O-O" === e ? 1 : -1, s = kings[t >> 3], n = t + 2, i = 16 | n, r = 0, a = s + 2 * nCastlType, etc.aBoard[s + 3 + 7 * (nCastlType - 1) / 2] = 0, etc.aBoard[s + nCastlType] = t + 5, kings[t >> 3] = a;
                else {
                    var l, d = nAlgStartY = 8,
                        c = /(\=.+)/,
                        u = e.replace(c, "").search(/[A-Z]/),
                        h = e.match(/\d/g),
                        f = e.replace(/x/g, "").match(/[a-z]/g),
                        m = f[f.length - 1].charCodeAt(0) - 97,
                        g = h[h.length - 1] - 1;
                    f.length > 1 && (d = f[0].charCodeAt(0) - 97), h.length > 1 && (nAlgStartY = h[0] - 1), l = u > -1 ? "PKNBRQ".indexOf(e.substr(u, 1)) + 1 : 1;
                    var p = l | t,
                        B = e.search(c);
                    if (a = 10 * g + m + 21, 8 > d) {
                        if (8 > nAlgStartY) {
                            if (!etc.lookAt(d, nAlgStartY) || !etc.isValidMove(d, nAlgStartY, m, g)) return !1;
                            s = 10 * nAlgStartY + d + 21, i = etc.aBoard[s]
                        } else
                            for (var v = 0; 8 > v; v++)
                                if (iFoundPc = etc.lookAt(d, v), (15 & iFoundPc) === p && etc.isValidMove(d, v, m, g)) {
                                    nAlgStartY = v, s = 10 * v + d + 21, i = iFoundPc;
                                    break
                                }
                    } else if (8 > nAlgStartY) {
                        for (var b = 0; 8 > b; b++)
                            if (iFoundPc = etc.aBoard[10 * nAlgStartY + b + 21], (15 & iFoundPc) === p && etc.isValidMove(b, nAlgStartY, m, g)) {
                                d = b, s = 10 * nAlgStartY + b + 21, i = iFoundPc;
                                break
                            }
                    } else
                        for (var C = 21; 99 > C; C += 8 > C % 10 ? 1 : 3)
                            if (iFoundPc = etc.aBoard[C], (15 & iFoundPc) === p && etc.isValidMove(C % 10 - 1, (C - C % 10) / 10 - 2, m, g)) {
                                d = C % 10 - 1, nAlgStartY = (C - C % 10) / 10 - 2, s = C, i = iFoundPc;
                                break
                            }
                    n = 1 === (7 & i) && 9 === (9 | g + 1) ? -1 === B ? 22 - etc.nPromotion ^ t : "KNBRQ".indexOf(e.substr(B + 1, 1)) + t + 18 : i, r = etc.aBoard[a]
                }
                if (0 === s) return !1;
                var w = kings[1 ^ t >> 3];
                return 1 === (7 & i) && 1 & s + a && 0 === r && (etc.aBoard[s - s % 10 + a % 10] = 0), etc.aBoard[s] = 0, etc.aBoard[a] = n, 2 === (7 & i) && (kings[t >> 3] = a), bCheck = isThreatened(w % 10 - 1, (w - w % 10) / 10 - 2, t), nFrstFocus = s, nScndFocus = a, nPawnStride = 1 === (7 & i) && 4 === (4 | nAlgStartY - g + 2) ? a : 0, fourBtsLastPc = 15 & i, writeHistory(o, s, a, i, r, n), !0
            } catch (S) {
                return !1
            }
        }

        function readHistory(e, t) {
            var o, a, n, i, r, s, l = 0,
                d = Math.abs(e),
                c = [null, null];
            0 > e && (l = 1), nFrstFocus = nScndFocus = 0, flagWhoMoved ^= 8 & d << 3;
            for (var u = 0; d > u; u++) o = aHistory[iHistPointr + 1 - l], c[0] = 127 & o, c[1] = 127 & o >> 7, i = o >> 14, r = 31 & o >> 19, s = i > 1023 ? l ? 9 - (8 & c[1] - c[1] % 10) : o >> 24 : !1, 2 === (7 & i) && (4 === (4 | c[1] - c[0] + 2) && (a = c[1] - c[1] % 10 + (c[1] - c[0] > 0 ? 8 : 1), n = c[1] - c[1] % 10 + (c[1] - c[0] > 0 ? 6 : 4), etc.aBoard[l ? a : n] = 5 + (8 & c[1] - c[1] % 10) + (l << 4), etc.aBoard[l ? n : a] = 0), kings[1 & iHistPointr + 1 + l] = c[1 ^ l]), etc.aBoard[c[1 ^ l]] = s || i & 15 + (l << 4), etc.aBoard[c[l]] = 1 === l ? r : 0, 1 === (7 & i) && 1 & c[1] - c[0] && 0 === r && (etc.aBoard[c[0] - c[0] % 10 + c[1] % 10] = l ? 1 | 8 ^ 8 & i : 0), iHistPointr += 1 - (l << 1), u === d - 1 && getInCheckPieces(), etc.bSolidView && oSolidBoard.move(l, c[0], c[1], r, s); - 1 === iHistPointr ? fourBtsLastPc = nPawnStride = lastStart = lastEnd = 0 : (l && (o = aHistory[iHistPointr], c[0] = 127 & o, c[1] = 127 & o >> 7, i = o >> 14), nPawnStride = 1 === (7 & i) && 4 === (4 | (c[0] - c[1] - c[0] % 10 + c[1] % 10) / 10 + 2) ? c[1] : 0, lastStart = c[0], lastEnd = c[1], fourBtsLastPc = 15 & i), etc.bFlatView && writeFlatPieces(), t && (oMovesSelect.selectedIndex = iHistPointr + 2 >> 1)
        }

        function histClearIter() {
            bMotion && (window.clearInterval(nMotionId), oMovesSelect.disabled = bMotion = !1, bBoundLock && (bReady = !0))
        }

        function sendAlgebraic(e) {
            if (!bReady) return !1;
            if (iHistPointr + 1 < aHistory.length) {
                if (!confirm("Moving now all subsequent moves will be lost. Do you want try to move?")) return !1;
                trimHistory()
            }
            return runAlgebraic(e, 8 ^ flagWhoMoved, !0) ? (1 === (7 & fourBtsLastPc) & (29 > nScndFocus | nScndFocus > 90) && (fourBtsLastPc = 14 - etc.nPromotion ^ flagWhoMoved), flagWhoMoved ^= 8, etc.bFlatView && writeFlatPieces(), bAI && flagWhoMoved === flagHumanBlack && (bReady = !1, window.setTimeout(engineMove, 250)), !0) : !1
        }

        function closeMsg(e, t) {
            for (var o = 1, a = 1; 5 > a; a++) window.setTimeout(function() {
                e.style.opacity = "0." + String(85 - 17 * o), o++
            }, 50 * a);
            window.setTimeout(function() {
                e.style.opacity = "0", oNtfArea.removeChild(e), iNtfs--, 1 === iNtfs && (oNtfClsAll.style.display = "none"), 0 === iNtfs && (document.body.removeChild(oNtfArea), oNtfArea = null, oNtfClsAll = null, aCloseCalls = [])
            }, 250), aCloseCalls[t] = !1
        }

        function sendMsg(e, t, o) {
            var a = document.createElement("div"),
                n = document.createElement("div"),
                i = document.createElement("div"),
                r = document.createElement("div"),
                s = 1,
                l = aCloseCalls.length;
            null === oNtfArea && (oNtfClsAll = document.createElement("div"), oNtfArea = document.createElement("div"), setAttribs.call(oNtfArea, ["className", "top-right gnotify"], ["id", "gnotify"]), setAttribs.call(oNtfClsAll, ["className", "gnotify-closer"], ["innerHTML", "[ close all ]"], ["onclick", function() {
                for (var e = 1, t = 0; t < aCloseCalls.length; t++) aCloseCalls[t] !== !1 && window.clearTimeout(aCloseCalls[t]);
                for (var o = 1; 5 > o; o++) window.setTimeout(function() {
                    oNtfArea.style.opacity = "0." + String(85 - 17 * e), e++
                }, 50 * o);
                window.setTimeout(function() {
                    oNtfArea.style.opacity = "0", document.body.removeChild(oNtfArea), oNtfArea = null, oNtfClsAll = null, iNtfs = 0, aCloseCalls = new Array
                }, 250)
            }]), document.body.appendChild(oNtfArea), oNtfArea.appendChild(oNtfClsAll)), iNtfs > 0 && (oNtfClsAll.style.display = "block");
            for (var d = 1; 6 > d; d++) window.setTimeout(function() {
                a.style.opacity = "0." + String(17 * s), s++
            }, 50 * d);
            aCloseCalls.push(window.setTimeout(function() {
                closeMsg(a, l), a = null
            }, o)), a.className = "gnotify-notification default", setAttribs.call(n, ["className", "close"], ["onclick", function() {
                aCloseCalls[l] !== !1 && (window.clearTimeout(aCloseCalls[l]), closeMsg(a, l))
            }], ["innerHTML", "&times;"]), setAttribs.call(i, ["className", "header"], ["innerHTML", e]), setAttribs.call(r, ["className", "gnotify-message"], ["innerHTML", t]), a.appendChild(n), a.appendChild(i), a.appendChild(r), setStyles.call(a, ["display", "block"], ["opacity", "0"]), oNtfArea.insertBefore(a, oNtfClsAll), iNtfs++
        }

        function returnFalse() {
            return !1
        }

        function getSqFnc() {
            var e = parseFloat(this.id.substr(this.id.search(/\d+/)));
            etc.makeSelection(etc.bBlackSide ? 119 - e : e, !1)
        }

        function synchrMovesList() {
            var e = (this.selectedIndex << 1) - iHistPointr - (this.selectedIndex > 0 && flagHumanBlack ? 2 : 1);
            bMotion || 0 === e || readHistory(e, !1)
        }

        function resizeFilm(e) {
            e || (e = window.event);
            var t = e.clientX + nPageX + nDscrsX - iBoardsBoxX,
                o = e.clientY + nPageY + nDscrsY - iBoardsBoxY;
            nDeskWidth = nMinWidth > t ? nMinWidth : nDeskWidth = 1 | t - 1, nDeskHeight = nMinHeight > o ? nMinHeight : 1 | o - 1, oFilm.style.width = nDeskWidth + "px", oFilm.style.height = nDeskHeight + "px"
        }

        function updateViewSize(e, t) {
            var o = e ? nDeskWidth / 2 : nDeskWidth;
            nFlatBoardSide = (nDeskHeight > o ? o : nDeskHeight) - nFlatBVMargin, etc.i3DWidth = etc.bFlatView ? nDeskWidth / 2 : nDeskWidth, etc.bFlatView && (etc.oFlatVwArea.style.width = o + "px", etc.oFlatVwArea.style.height = nDeskHeight + "px", oBoardTable.style.marginTop = oBoardTable.style.marginBottom = String((nDeskHeight - nFlatBoardSide) / 2) + "px", oBoardTable.style.width = nFlatBoardSide + "px", oBoardTable.style.height = nFlatBoardSide + "px"), e && t && oSolidBoard.updateSize()
        }

        function stopResizing() {
            Canvas3D.removeEvent(document, "mousemove", resizeFilm), Canvas3D.removeEvent(document, "mouseup", stopResizing), etc.i3DHeight = nDeskHeight, updateViewSize(etc.bSolidView, !0), oBoardsBox.style.width = nDeskWidth + "px", oBoardsBox.style.height = nDeskHeight + "px", document.body.removeChild(oFilm)
        }

        function startResizing(e) {
            var t = oBoardsBox;
            for (nMinWidth = etc.bFlatView && etc.bSolidView ? nMinHeight << 1 : nMinHeight, e || (e = window.event), nPageX = document.documentElement.scrollLeft || document.body.scrollLeft, nPageY = document.documentElement.scrollTop || document.body.scrollTop, iBoardsBoxX = 0, iBoardsBoxY = 0; t.offsetParent;) iBoardsBoxX += t.offsetLeft, iBoardsBoxY += t.offsetTop, t = t.offsetParent;
            return setStyles.call(oFilm, ["width", nDeskWidth + "px"], ["height", nDeskHeight + "px"], ["left", iBoardsBoxX + "px"], ["top", iBoardsBoxY + "px"]), document.body.appendChild(oFilm), nDscrsX = iBoardsBoxX - nPageX + oBoardsBox.offsetWidth - e.clientX, nDscrsY = iBoardsBoxY - nPageY + oBoardsBox.offsetHeight - e.clientY, Canvas3D.addEvent(document, "mousemove", resizeFilm), Canvas3D.addEvent(document, "mouseup", stopResizing), !1
        }

        function capitalize(e) {
            return e.toUpperCase()
        }

        function changeTagName() {
            var e = this.innerHTML;
            if ("Result" === e) return alert("You can not change this key."), void 0;
            if (bCtrlIsDown) bCtrlIsDown = !1, confirm("Do you want to delete this tag?") && (delete oGameInfo[this.innerHTML], this.parentNode.removeChild(this.nextSibling), this.parentNode.removeChild(this.nextSibling), this.parentNode.removeChild(this.nextSibling), this.parentNode.removeChild(this));
            else {
                var t = prompt("Write the new name of the key.", e);
                if (!t) return;
                if (t = t.replace(/^[a-z]/, capitalize), t === e || t.search(rDeniedTagChrs) > -1 || oGameInfo.hasOwnProperty(t)) return;
                var o;
                for (var a in oGameInfo) oNewInfo[a === e ? t : a] = oGameInfo[a], delete oGameInfo[a];
                o = oGameInfo, oGameInfo = oNewInfo, oNewInfo = o, updatePGNHeader(), updatePGNLink(), this.innerHTML = t
            }
        }

        function changeTagVal() {
            var e = this.previousSibling.previousSibling.innerHTML;
            if ("Result" === e) return alert("You can not change the result of the game!"), void 0;
            var t = prompt("Write the new value.", this.innerHTML);
            null !== t && (oGameInfo[e] = this.innerHTML = t || "?", updatePGNHeader(), updatePGNLink())
        }

        function addInfoTag() {
            var e = prompt("Write the name of the new tag.");
            if (e && !(e.search(rDeniedTagChrs) > -1)) {
                e = e.replace(/^[a-z]/, capitalize);
                var t = !1;
                for (var o in oGameInfo)
                    if (o.toLowerCase() === e.toLowerCase()) {
                        t = o;
                        break
                    }
                if (t) return alert(o + " already exists!"), void 0;
                if (newTagV = prompt("Write the value of the new tag.")) {
                    oGameInfo[e] = newTagV, updatePGNHeader(), updatePGNLink();
                    var a = this.previousSibling;
                    this.parentNode.insertBefore(setAttribs.call(document.createElement("span"), ["className", "infoKey"], ["onclick", changeTagName], ["innerHTML", e]), a), this.parentNode.insertBefore(document.createTextNode(": "), a), this.parentNode.insertBefore(setAttribs.call(document.createElement("span"), ["className", "infoVal"], ["onclick", changeTagVal], ["innerHTML", newTagV]), a), this.parentNode.insertBefore(document.createElement("br"), a)
                }
            }
        }

        function showInfo() {
            if (!bInfoBox) {
                var e = document.createElement("p"),
                    t = document.createElement("span"),
                    o = document.createElement("span");
                for (var a in oGameInfo) e.appendChild(setAttribs.call(document.createElement("span"), ["className", "infoKey"], ["onclick", changeTagName], ["innerHTML", a])), e.appendChild(document.createTextNode(": ")), e.appendChild(setAttribs.call(document.createElement("span"), ["className", "infoVal"], ["onclick", changeTagVal], ["innerHTML", oGameInfo[a]])), e.appendChild(document.createElement("br"));
                e.title = "Hold down the ctrl button and click the tag name to remove all its contents.", setAttribs.call(t, ["className", "chessCtrlBtn"], ["onclick", addInfoTag], ["innerHTML", "Add tag"]), setAttribs.call(o, ["className", "chessCtrlBtn"], ["onclick", hideInfo], ["innerHTML", "Close"]), e.appendChild(document.createElement("br")), e.appendChild(t), e.appendChild(document.createTextNode(" ")), e.appendChild(o), oInfoBox.appendChild(e), bInfoBox = !0
            }
        }

        function hideInfo() {
            oInfoBox.innerHTML = "", bInfoBox = !1
        }

        function algBoxListener(e) {
            13 === e.keyCode && sendAlgebraic(this.value) && (this.value = "")
        }

        function algBoxFocus() {
            this.style.borderColor = "#ffff00", this.value === sAlgBoxEmpty && (this.value = ""), bUseKeyboard && (etc.bKeyCtrl = !1)
        }

        function algBoxBlur() {
            this.style.borderColor = "", this.value = this.value || sAlgBoxEmpty, bUseKeyboard && (etc.bKeyCtrl = !0)
        }

        function minMaxCtrl() {
            oCtrlForm.style.display ? (oCtrlForm.style.display = "", this.innerHTML = "&ndash;") : (oCtrlForm.style.display = "none", this.innerHTML = "+")
        }

        function getCtrlDown(e) {
            17 === e.keyCode && (bCtrlIsDown = !0)
        }

        function getCtrlUp(e) {
            e.ctrlKey && (bCtrlIsDown = !1)
        }
        var wdx = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        wdx = Math.min(document.getElementById("fragment-1").clientWidth * 0.9, 512);
        var nflbvmrg = 12;
        var oSolidBoard, bUseKeyboard = !1,
            graphicsStatus = 0,
            oBoardTable = null,
            aCoords, aFlatSquares, sLstSqColr, oBoardsBox, bHumanSide = !0,
            nDeskWidth = wdx,
            nDeskHeight = wdx,
            nFlatBVMargin = nflbvmrg,
            nFlatBoardSide = nDeskHeight - nFlatBVMargin,
            nPageX, nPageY, iBoardsBoxX, iBoardsBoxY, nDscrsX, nDscrsY, oFilm, nMinWidth = nMinHeight = wdx,
            nMotionId, bMotion = !1,
            bBoundLock = !1,
            nFrameRate = 1e3,
            oPGNBtn, oMovesSelect, oInfoBox, oCtrlForm, oNtfArea = null,
            oNtfClsAll = null,
            bInfoBox = !1,
            aCloseCalls = [],
            iNtfs = 0,
            rDeniedTagChrs = /(^\d)|\W/g,
            sAlgBoxEmpty = "digit your move...",
            bCtrlIsDown = !1,
            sMovesList, sPGNHeader, flagHumanBlack, bReady = !0,
            bAI = !0,
            bCheck = !1,
            bGameNotOver = !0,
            lastStart = 0,
            lastEnd = 0,
            iHistPointr = -1,
            aHistory = [],
            kings = [0, 0],
            iRound = 1,
            oGameInfo = {},
            oNewInfo = {},
            etc = {
                aBoard: [],
                aThreats: [],
                nPromotion: 0,
                bFlatView: !1,
                bSolidView: !1,
                bBlackSide: !1,
                oFlatVwArea: null,
                oSolidVwArea: null,
                aPiecesLab: null,
                bKeyCtrl: !0,
                i3DWidth: nDeskWidth,
                i3DHeight: nDeskHeight,
                lookAt: function(e, t) {
                    return this.aBoard[10 * t + e + 21]
                },
                isValidMove: function(e, t, o, a) {
                    var n = 10 * t + e + 21,
                        i = this.aBoard[n];
                    if (0 === i) return !0;
                    var r = 10 * a + o + 21,
                        s = this.aBoard[r],
                        l = 7 & i,
                        d = 8 & i,
                        c = Boolean(16 ^ 16 & i),
                        u = 8 & s,
                        h = 4 - d >> 2,
                        f = o - e,
                        m = a - t;
                    switch (l) {
                        case 1:
                            if ((7 | m) - 3 >> 2 !== h) return !1;
                            if (0 === f) {
                                if (2 !== (2 | m + 1) && 4 !== (4 | m + 2)) return !1;
                                if (s > 0) return !1;
                                if (a === t + 2 * h) {
                                    if (c) return !1;
                                    if (this.lookAt(o, a - h) > 0) return !1
                                }
                            } else {
                                if (2 !== (2 | f + 1)) return !1;
                                if (m !== h) return !1;
                                if ((1 > s || u === d) && (t !== 7 + h >> 1 || nPawnStride % 10 - 1 !== o)) return !1
                            }
                            break;
                        case 3:
                            if (2 !== ((2 | m + 1) - 2 | (4 | f + 2) - 2) && 2 !== ((4 | m + 2) - 2 | (2 | f + 1) - 2)) return !1;
                            if (s > 0 && u === d) return !1;
                            break;
                        case 6:
                            if (a !== t && o !== e && Math.abs(f) !== Math.abs(m)) return !1;
                            break;
                        case 5:
                            if (a !== t && o !== e) return !1;
                            break;
                        case 4:
                            if (Math.abs(f) !== Math.abs(m)) return !1;
                            break;
                        case 2:
                            var g;
                            if (0 !== m && 2 !== (2 | m + 1) || 0 !== f && 2 !== (2 | f + 1)) {
                                if (g = this.lookAt(7 & 30 - f >> 2, a), 4 !== (4 | f + 2) || 0 !== m || bCheck || c || !(g > 0) || !Boolean(16 & g)) return !1;
                                for (var p = 3 * f + 14 >> 2; 3 * f + 22 >> 2 > p; p++)
                                    if (this.lookAt(p, a) > 0 || isThreatened(p, a, 1 ^ a / 7 << 3)) return !1;
                                if (0 === f + 2 && this.aBoard[10 * a + 22] > 0) return !1
                            } else if (s > 0 && u === d) return !1
                    }
                    if (5 === l || 6 === l) {
                        if (a === t)
                            if (o > e) {
                                for (var B = e + 1; o > B; B++)
                                    if (this.lookAt(B, a) > 0) return !1
                            } else
                                for (var B = e - 1; B > o; B--)
                                    if (this.lookAt(B, a) > 0) return !1;
                        if (o === e)
                            if (a > t) {
                                for (var v = t + 1; a > v; v++)
                                    if (this.lookAt(o, v) > 0) return !1
                            } else
                                for (var v = t - 1; v > a; v--)
                                    if (this.lookAt(o, v) > 0) return !1;
                        if (s > 0 && u === d) return !1
                    }
                    if (4 === l || 6 === l) {
                        if (a > t) {
                            var b = t + 1;
                            if (o > e)
                                for (var C = e + 1; o > C; C++) {
                                    if (this.lookAt(C, b) > 0) return !1;
                                    b++
                                } else
                                    for (var C = e - 1; C > o; C--) {
                                        if (this.lookAt(C, b) > 0) return !1;
                                        b++
                                    }
                        }
                        if (t > a) {
                            var b = t - 1;
                            if (o > e)
                                for (var C = e + 1; o > C; C++) {
                                    if (this.lookAt(C, b) > 0) return !1;
                                    b--
                                } else
                                    for (var C = e - 1; C > o; C--) {
                                        if (this.lookAt(C, b) > 0) return !1;
                                        b--
                                    }
                        }
                        if (s > 0 && u === d) return !1
                    }
                    if (7 & s + 6) {
                        var w = !1,
                            S = 2 === l ? r : kings[d >> 3];
                        if (this.aBoard[n] = 0, this.aBoard[r] = i, isThreatened(S % 10 - 1, (S - S % 10) / 10 - 2, 8 ^ d) && (w = !0), this.aBoard[n] = i, this.aBoard[r] = s, w) return !1
                    }
                    return !0
                },
                makeSelection: function(e, t) {
                    if (bReady)
                        if (fourBtsLastPc = 15 & (etc.aBoard[e] ^ flagWhoMoved), fourBtsLastPc > 8) etc.bSolidView && oSolidBoard.selectPiece(e, !0, t), etc.bFlatView && (nFrstFocus && squareFocus(nFrstFocus, !1), t || squareFocus(e, !0)), nFrstFocus = e;
                        else if (nFrstFocus && 9 > fourBtsLastPc) {
                        if (iHistPointr + 1 < aHistory.length && etc.isValidMove(nFrstFocus % 10 - 1, (nFrstFocus - nFrstFocus % 10) / 10 - 2, e % 10 - 1, (e - e % 10) / 10 - 2)) {
                            if (!confirm("Moving now all subsequent moves will be lost. Are you sure?")) return;
                            trimHistory()
                        }
                        nScndFocus = e, fourBtsLastPc = 15 & etc.aBoard[nFrstFocus], 1 === (7 & fourBtsLastPc) & (29 > nScndFocus | nScndFocus > 90) && (fourBtsLastPc = 14 - etc.nPromotion ^ flagWhoMoved), consider(0, 0, 0, 21, nPawnStride, 1), etc.bSolidView && oSolidBoard.selectPiece(e, !1, t), etc.bFlatView && (squareFocus(nFrstFocus, !1), writeFlatPieces()), bAI && flagWhoMoved === flagHumanBlack && 9 > fourBtsLastPc - flagHumanBlack && (bReady = !1, window.setTimeout(engineMove, 250))
                    }
                }
            },
            fourBtsLastPc, flagWhoMoved, nPawnStride, nFrstFocus, nScndFocus, nPlyDepth = 2,
            iSquare = 120,
            thnkU = [53, 47, 61, 51, 47, 47],
            aParams = [5, 3, 4, 6, 2, 4, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 13, 11, 12, 14, 10, 12, 11, 13, 0, 99, 0, 306, 297, 495, 846, -1, 0, 1, 2, 2, 1, 0, -1, -1, 1, -10, 10, -11, -9, 9, 11, 10, 20, -9, -11, -10, -20, -21, -19, -12, -8, 8, 12, 19, 21];
        return {
            help: function() {
                bReady && (engineMove(), bReady = !1, window.setTimeout(engineMove, 250), etc.bFlatView && nFrstFocus && squareFocus(nFrstFocus, !1))
            },
            organize: function(e) {
                resetBoard(), flagHumanBlack = e ? 8 : 0, newPGNHeader(), bHumanSide && (etc.bBlackSide = e), bInfoBox && hideInfo(), etc.bSolidView && oSolidBoard.update(!0), etc.bFlatView && (updateFlatCoords(), writeFlatPieces()), updatePGNLink(), e && bAI && (bReady = !1, window.setTimeout(engineMove, 250))
            },
            place: function(e) {
                if (oBoardsBox) oBoardsBox.parentNode.removeChild(oBoardsBox);
                else {
                    var t = document.createElement("div"),
                        o = document.createElement("div"),
                        a = document.createElement("div"),
                        n = document.createElement("input"),
                        i = document.createElement("p"),
                        r = document.createElement("p"),
                        s = document.createElement("span");
                    etc.oFlatVwArea = document.createElement("div"), etc.oSolidVwArea = document.createElement("div"), oBoardsBox = document.createElement("div"), oPGNBtn = document.createElement("a"), oInfoBox = document.createElement("div"), oCtrlForm = document.createElement("form"), oMovesSelect = document.createElement("select"), oFilm = document.createElement("div"), setAttribs.call(n, ["type", "text"], ["id", "chessAlgebraic"], ["value", sAlgBoxEmpty], ["onkeypress", algBoxListener], ["onfocus", algBoxFocus], ["onblur", algBoxBlur]), setAttribs.call(s, ["className", "chessCtrlBtn"], ["onclick", showInfo], ["innerHTML", "Game info"]), oInfoBox.id = "chessInfo", oBoardsBox.id = "chessboardsBox", oBoardsBox.onmousedown = returnFalse, oBoardsBox.style.width = nDeskWidth + "px", oBoardsBox.style.height = nDeskHeight + "px", setAttribs.call(t, ["id", "chessSizeHandle"], ["innerHTML", "&#9698;"], ["onmousedown", startResizing]), setAttribs.call(a, ["id", "chessClosePanel"], ["onclick", minMaxCtrl], ["onmousedown", returnFalse], ["innerHTML", "&ndash;"]), r.className = "ctrlBtns", etc.oFlatVwArea.id = "chess2DBox", etc.oSolidVwArea.id = "chess3DBox", oCtrlForm.onsubmit = returnFalse, oFilm.className = "chessFilmBox", setAttribs.call(oMovesSelect, ["id", "chessMoves"], ["size", 10], ["onchange", synchrMovesList]), oPGNBtn.className = "chessCtrlBtn", oPGNBtn.innerHTML = "Save as PGN", o.id = "chessCtrlPanel", i.appendChild(oMovesSelect), i.appendChild(document.createElement("br")), i.appendChild(n), r.appendChild(oPGNBtn), r.appendChild(document.createTextNode(" ")), r.appendChild(s), oCtrlForm.appendChild(i), oCtrlForm.appendChild(r), oCtrlForm.appendChild(oInfoBox), o.appendChild(a), o.appendChild(oCtrlForm), oBoardsBox.appendChild(etc.oSolidVwArea), oBoardsBox.appendChild(etc.oFlatVwArea), oBoardsBox.appendChild(t), document.body.appendChild(o), Canvas3D.addEvent(document, "keydown", getCtrlDown), Canvas3D.addEvent(document, "keyup", getCtrlUp)
                }
                e.appendChild(oBoardsBox), this.organize(!1)
            },
            setView: function(e) {
                if (!bReady) return !1;
                var t = !1,
                    o = Boolean(1 & e),
                    a = Boolean(2 & e),
                    n = Boolean(1 & e ^ etc.bFlatView);
                return o && a && nMinHeight << 1 > nDeskWidth && (nDeskWidth = nMinWidth = nMinHeight << 1, oBoardsBox.style.width = nDeskWidth + "px"), o ? etc.bFlatView || (showFlatBoard(), t = !0) : etc.bFlatView && (etc.oFlatVwArea.style.width = "0", etc.oFlatVwArea.removeChild(oBoardTable), etc.bFlatView = !1, t = !0), a ? etc.bSolidView || (showSolidBoard(), t = !1) : etc.bSolidView && (oSolidBoard.hide(), t = !0), t && updateViewSize(a, n), !0
            },
            showHide2D: function() {
                return bReady ? (etc.bFlatView ? (etc.oFlatVwArea.style.width = "0", etc.oFlatVwArea.removeChild(oBoardTable), etc.bFlatView = !1) : (etc.bSolidView && nMinHeight << 1 > nDeskWidth && (nDeskWidth = nMinWidth = nMinHeight << 1, oBoardsBox.style.width = nDeskWidth + "px"), showFlatBoard()), updateViewSize(etc.bSolidView, !0), !0) : !1
            },
            showHide3D: function() {
                return bReady ? (etc.bSolidView ? (oSolidBoard.hide(), updateViewSize(!1, !1)) : (showSolidBoard(), etc.bFlatView && nMinHeight << 1 > nDeskWidth && (nDeskWidth = nMinWidth = nMinHeight << 1, oBoardsBox.style.width = nDeskWidth + "px")), !0) : !1
            },
            lock: function() {
                bMotion ? bBoundLock = !1 : bReady = !1
            },
            unlock: function() {
                histClearIter(), bReady = !0
            },
            useAI: function(e) {
                bAI = e
            },
            placeById: function(e) {
                this.place(document.getElementById(e))
            },
            setPlyDepth: function(e) {
                var t = new Number(e);
                return isNaN(t) || 0 > t ? !1 : (nPlyDepth = t + 2, !0)
            },
            setPromotion: function(e) {
                etc.nPromotion = 3 & e
            },
            navigate: function(e, t, o) {
                var a = Number(e),
                    n = 0 > a,
                    i = aHistory.length;
                if (!bMotion && 0 !== a && 0 !== i)
                    if (t) oMovesSelect.disabled = bMotion = !0, bReady && (bBoundLock = !0, bReady = !1), nMotionId = window.setInterval(function() {
                        var e = aHistory.length;
                        return -1 > iHistPointr + a || a + iHistPointr > e - 1 ? (window.clearInterval(nMotionId), oMovesSelect.disabled = bMotion = !1, n && iHistPointr > -1 ? readHistory(~iHistPointr, !0) : !n && e - 1 > iHistPointr && readHistory(e - iHistPointr - 1, !0), bBoundLock && (bReady = !0), void 0) : (readHistory(a, !0), void 0)
                    }, o || nFrameRate);
                    else {
                        if (-1 > iHistPointr + a || a + iHistPointr + 1 > i) return n && iHistPointr > -1 ? readHistory(~iHistPointr, !0) : !n && i - 1 > iHistPointr && readHistory(i - iHistPointr - 1, !0), void 0;
                        readHistory(a, !0)
                    }
            },
            stopMotion: histClearIter,
            backToStart: function() {
                bMotion || -1 === iHistPointr || readHistory(~iHistPointr, !0)
            },
            returnToEnd: function() {
                var e = aHistory.length;
                bMotion || iHistPointr === e - 1 || readHistory(e - iHistPointr - 1, !0)
            },
            readPGN: function(e, t) {
                var o, a, n = e.replace(/\{.*\}/g, "").replace(/\s*;[^\n]\s*|\s+/g, " "),
                    i = "\\[[^\\]]*\\]",
                    r = n.match(new RegExp(i, "g")),
                    s = n.replace(new RegExp("^\\s*(" + i + "\\s*)*(\\d+\\.\\s*)?|\\+|\\s*((#|(\\d+(/\\d+)?\\-\\d+(/\\d+)?)|\\*).*)?$", "g"), "").split(/\s+\d+\.\s*/);
                resetBoard();
                for (var l in oGameInfo) delete oGameInfo[l];
                if (r)
                    for (var d = 0; d < r.length; d++) o = r[d].replace(/^\[\s*|"\s*\]$/g, "").split(/\s*"\s*/), o.length > 1 && (oGameInfo[o[0]] = o[1]);
                for (var c = 0; c < s.length && (a = s[c].split(/\s+/), runAlgebraic(a[0], 0, !1)); c++)
                    if (a.length < 2 || !runAlgebraic(a[1], 8, !1)) {
                        flagWhoMoved = 0;
                        break
                    }
                flagHumanBlack = t ? 8 : 0, bHumanSide && (etc.bBlackSide = t || !1), getInCheckPieces(), updatePGNHeader(), updatePGNLink(), bInfoBox && hideInfo(), etc.bSolidView && oSolidBoard.update(!1), etc.bFlatView && writeFlatPieces(), bAI && bGameNotOver && flagWhoMoved === flagHumanBlack && (bReady = !1, window.setTimeout(engineMove, 250))
            },
            readAlgebraic: sendAlgebraic,
            setFrameRate: function(e) {
                nFrameRate = e
            },
            setDimensions: function(e, t) {
                nDeskWidth = nMinWidth > e ? nMinWidth : nDeskWidth = 1 | e - 1, nDeskHeight = etc.i3DHeight = nMinHeight > t ? nMinHeight : 1 | t - 1, updateViewSize(etc.bSolidView, !0), oBoardsBox.style.width = nDeskWidth + "px", oBoardsBox.style.height = nDeskHeight + "px"
            },
            getDimensions: function() {
                return [nDeskWidth, nDeskHeight]
            },
            setSide: function(e) {
                var t = etc.bBlackSide;
                bHumanSide = Boolean(e >> 1), etc.bBlackSide = bHumanSide ? Boolean(flagHumanBlack) : Boolean(1 & e), etc.bBlackSide !== t && (etc.bFlatView && (updateFlatCoords(), writeFlatPieces()), etc.bSolidView && oSolidBoard.updateView())
            },
            useKeyboard: function(e) {
                etc.bKeyCtrl = bUseKeyboard = e
            }
        }
    }(),
    Canvas3D = {
        addEvent: function(e, t, o) {
            e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent && e.attachEvent("on" + t, o)
        },
        removeEvent: function(e, t, o) {
            e.removeEventListener ? e.removeEventListener(t, o, !1) : e.detachEvent && e.detachEvent("on" + t, o)
        }
    };