export const R1BuddyPlugin = async ({ $ }) => {
  var API = 'http://localhost:9876/buddy/state'
  var s = { connected: true, sessions: 0, running: 0, waiting: 0, tokens: 0, tokens_today: 0, msg: '', status: 'idle' }

  async function post() {
    try { await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) }) } catch (e) {}
  }

  return {
    event: async ({ event }) => {
      var t = event.type
      if (t === 'session.created') {
        s.sessions = (s.sessions || 0) + 1
        s.status = 'active'
        s.msg = 'session started'
      } else if (t === 'session.status') {
        s.status = event.status || 'active'
        if (typeof event.running === 'number') s.running = event.running
        if (typeof event.waiting === 'number') s.waiting = event.waiting
        if (typeof event.tokens === 'number') s.tokens = event.tokens
      } else if (t === 'session.updated') {
        if (typeof event.running === 'number') s.running = event.running
        if (typeof event.waiting === 'number') s.waiting = event.waiting
        if (typeof event.tokens === 'number') s.tokens = event.tokens
        if (event.msg) s.msg = event.msg
        s.status = s.running > 0 ? 'running' : 'active'
      } else if (t === 'session.idle') {
        s.status = 'idle'
        s.running = 0
        s.msg = 'idle'
      } else if (t === 'session.error') {
        s.status = 'error'
        s.msg = event.msg || 'error'
      }
      await post()
    }
  }
}
