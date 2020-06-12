function plugin (instance, opts) {
  instance.decorate('whisperSecret', opts.secret.toLowerCase())
}

module.exports = plugin