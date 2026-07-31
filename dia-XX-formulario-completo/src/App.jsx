import React, { useState, useEffect } from 'react'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [dob, setDob] = useState('')
  const [exp, setExp] = useState(5)
  const [accept, setAccept] = useState(false)
  const [languages, setLanguages] = useState([])
  const [mode, setMode] = useState('presencial')
  const [country, setCountry] = useState('')
  const [comments, setComments] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [color, setColor] = useState('#000000')
  const [submittedData, setSubmittedData] = useState(null)
  const [emailValid, setEmailValid] = useState(false)

  useEffect(() => {
    if (!photo) { setPhotoPreview(null); return }
    const url = URL.createObjectURL(photo)
    setPhotoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [photo])

  useEffect(() => {
    const re = /^\S+@\S+\.\S+$/
    setEmailValid(re.test(email))
  }, [email])

  function toggleLanguage(lang) {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang])
  }

  function handlePhoto(e) {
    const f = e.target.files && e.target.files[0]
    setPhoto(f || null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!accept) return
    if (!emailValid) return
    if (age && Number(age) <= 0) { alert('La edad debe ser mayor a 0'); return }

    setSubmittedData({
      name,
      email,
      password: '••••••',
      age,
      dob,
      exp,
      accept,
      languages,
      mode,
      country,
      comments,
      color,
      photoName: photo?.name || null,
      photoPreview
    })
  }

  return (
    <div className="container">
      <h1>Registro de estudiante</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />

        <label>Correo</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <div className="muted">{email ? (emailValid ? 'Email válido' : 'Email inválido') : ''}</div>

        <label>Contraseña</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <label>Edad</label>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} min="0" />

        <label>Fecha de nacimiento</label>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} />

        <label>Experiencia</label>
        <div className="row">
          <input type="range" min="1" max="10" value={exp} onChange={e => setExp(e.target.value)} />
          <div className="muted small">{exp}</div>
        </div>

        <label>
          <input type="checkbox" checked={accept} onChange={e => setAccept(e.target.checked)} /> Aceptar términos
        </label>

        <label>Lenguajes que conoces</label>
        <label><input type="checkbox" checked={languages.includes('JavaScript')} onChange={() => toggleLanguage('JavaScript')} /> JavaScript</label>
        <label><input type="checkbox" checked={languages.includes('Python')} onChange={() => toggleLanguage('Python')} /> Python</label>
        <label><input type="checkbox" checked={languages.includes('Java')} onChange={() => toggleLanguage('Java')} /> Java</label>

        <label>Modalidad</label>
        <label><input type="radio" name="mode" value="presencial" checked={mode==='presencial'} onChange={e => setMode(e.target.value)} /> Presencial</label>
        <label><input type="radio" name="mode" value="virtual" checked={mode==='virtual'} onChange={e => setMode(e.target.value)} /> Virtual</label>

        <label>País</label>
        <select value={country} onChange={e => setCountry(e.target.value)}>
          <option value="">-- Seleccionar --</option>
          <option value="Argentina">Argentina</option>
          <option value="Chile">Chile</option>
          <option value="Colombia">Colombia</option>
          <option value="Peru">Perú</option>
          <option value="Mexico">México</option>
        </select>

        <label>Comentarios</label>
        <textarea value={comments} onChange={e => setComments(e.target.value)} rows={4} />

        <label>Foto de perfil</label>
        <input type="file" accept="image/*" onChange={handlePhoto} />
        {photoPreview && <img src={photoPreview} alt="preview" className="preview" />}

        <label>Color favorito</label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="small" />

        <div className="actions">
          <button type="submit" disabled={!accept || !emailValid}>Enviar</button>
        </div>
      </form>

      {submittedData && (
        <div className="summary">
          <h2>Resumen</h2>
          <div><strong>Nombre:</strong> {submittedData.name}</div>
          <div><strong>Correo:</strong> {submittedData.email}</div>
          <div><strong>Edad:</strong> {submittedData.age}</div>
          <div><strong>Fecha de nacimiento:</strong> {submittedData.dob}</div>
          <div><strong>Experiencia:</strong> {submittedData.exp}</div>
          <div><strong>Modalidad:</strong> {submittedData.mode}</div>
          <div><strong>País:</strong> {submittedData.country}</div>
          <div><strong>Lenguajes:</strong> {submittedData.languages.join(', ')}</div>
          <div><strong>Comentarios:</strong> {submittedData.comments}</div>
          <div><strong>Color favorito:</strong> <span style={{display:'inline-block', width:20, height:20, background: submittedData.color, border:'1px solid #ccc', marginLeft:8}} /></div>
          <div><strong>Foto:</strong> {submittedData.photoName || 'No subida'}</div>
          {submittedData.photoPreview && (
            <div style={{marginTop:8}}>
              <img src={submittedData.photoPreview} alt="preview" className="preview" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
