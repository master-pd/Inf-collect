// state
const state = { device:false, geo:false, phone:false }

// open modal
document.getElementById('openPerm').addEventListener('click', ()=> {
  document.getElementById('modalWrap').style.display='flex'
})

// permission buttons
document.querySelectorAll('.perm-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key = btn.dataset.key
    state[key] = !state[key]
    btn.textContent = state[key] ? 'Allowed' : 'Allow'
    btn.style.background = state[key] ? '#e8f0ff' : ''
  })
})

// deny all
document.getElementById('denyAll').addEventListener('click', ()=>{
  for(const k in state) state[k]=false
  document.querySelectorAll('.perm-btn').forEach(b => { b.textContent='Allow'; b.style.background='' })
  document.getElementById('modalWrap').style.display='none'
  document.getElementById('prepare').style.display='inline-block'
})

// done -> close and show prepare
document.getElementById('done').addEventListener('click', ()=>{
  document.getElementById('modalWrap').style.display='none'
  document.getElementById('prepare').style.display='inline-block'
})

// prepare/collect
document.getElementById('prepare').addEventListener('click', async ()=>{
  const name = document.getElementById('name').value || null
  const email = document.getElementById('email').value || null
  const phone = state.phone ? (prompt('Enter phone number to share (include country code)') || null) : null

  let deviceInfo = null
  if(state.device){
    deviceInfo = {
      userAgent: navigator.userAgent || null,
      platform: navigator.platform || null,
      language: navigator.language || null,
      screen: { width: screen.width, height: screen.height }
    }
  }

  let geo = null
  if(state.geo && navigator.geolocation){
    geo = await new Promise(resolve=>{
      navigator.geolocation.getCurrentPosition(pos => {
        resolve({lat: pos.coords.latitude, lon: pos.coords.longitude, accuracy: pos.coords.accuracy})
      }, err => resolve({error: 'denied_or_unavailable', message: err.message}))
    })
  }

  const payload = {
    timestamp: new Date().toISOString(),
    provided: { name, email, phone },
    device: deviceInfo,
    geo
  }

  document.getElementById('result').textContent = JSON.stringify(payload, null, 2)

  // download
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'consent-'+Date.now()+'.json'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  alert('Data prepared and download started. Nothing was sent to any server.')
})

// accessibility: close modal on Esc
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape') document.getElementById('modalWrap').style.display='none'
})