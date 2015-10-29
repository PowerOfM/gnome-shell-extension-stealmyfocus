/* global imports */

const Main = imports.ui.main
const WindowAttentionHandler = imports.ui.windowAttentionHandler
const Shell = imports.gi.Shell
const Lang = imports.lang

// Class StealMyFocus
function StealMyFocus () {
  this._init()
  this.blacklist = {'skype': true}
}

StealMyFocus.prototype._init = function () {
  this._tracker = Shell.WindowTracker.get_default()
  this._handlerid = global.display.connect('window-demands-attention', Lang.bind(this, this._onWindowDemandsAttention))
}
StealMyFocus.prototype._onWindowDemandsAttention = function (display, window) {
  if (this.blacklist[window.title.toLowerCase()]) return false
  Main.activateWindow(window)
}

StealMyFocus.destroy = function () {
  global.display.disconnect(this._handlerid)
}

// GNome Extension
let stealmyfocus

function init () {}
function enable () {
  stealmyfocus = new StealMyFocus()
}
function disable () {
  stealmyfocus.destroy()
}
