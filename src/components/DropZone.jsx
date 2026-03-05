import { useState, useRef } from 'react'
import { formatBytes } from '../hooks/useApi'

function DropZone({ 
  files, 
  setFiles, 
  multiple = false, 
  acceptImages = false, 
  icon = '📄', 
  title = 'Dosyalarınızı buraya sürükleyin',
  sub = 'veya tıklayarak dosya seçin',
  accept = '.pdf'
}) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = (newFiles) => {
    const accepted = [...newFiles].filter(f => {
      const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
      const isImg = f.type.startsWith('image/')
      return isPdf || (acceptImages && isImg)
    })

    if (accepted.length === 0) return

    if (!multiple) {
      setFiles(accepted)
    } else {
      setFiles(prev => {
        const updated = [...prev]
        for (const f of accepted) {
          if (!updated.some(x => x.name === f.name && x.size === f.size)) {
            updated.push(f)
          }
        }
        return updated
      })
    }
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div 
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles([...e.dataTransfer.files])
        }}
      >
        <div className="drop-icon">{icon}</div>
        <p className="drop-title">{title}</p>
        <p className="drop-sub">veya <span className="link">tıklayarak dosya seçin</span></p>
        <input 
          ref={inputRef}
          type="file" 
          accept={acceptImages ? 'image/*' : accept}
          multiple={multiple}
          hidden
          onChange={(e) => handleFiles([...e.target.files])}
        />
      </div>

      {files.length > 0 && (
        <ul className="file-list">
          {files.map((file, i) => (
            <li key={i} className="file-item">
              <span className="file-icon">📄</span>
              <span className="file-name" title={file.name}>{file.name}</span>
              <span className="file-size">{formatBytes(file.size)}</span>
              <button className="remove-btn" onClick={() => removeFile(i)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default DropZone