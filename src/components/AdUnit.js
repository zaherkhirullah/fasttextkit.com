export default function AdUnit({ position = 'top' }) {
  const styles = {
    top: { margin: '1.5rem auto', maxWidth: '728px', minHeight: '90px' },
    bottom: { margin: '2rem auto', maxWidth: '728px', minHeight: '90px' },
    side: { margin: '1rem auto', maxWidth: '300px', minHeight: '250px' },
  }
  const labels = {
    top: 'Advertisement — 728×90',
    bottom: 'Advertisement — 728×90',
    side: 'Advertisement — 300×250',
  }
  return (
    <div style={{
      ...styles[position],
      background: '#1e293b',
      border: '1px dashed #334155',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#475569',
      fontSize: '0.8125rem',
      fontWeight: '500',
      letterSpacing: '0.05em',
    }}>
      {labels[position]}
    </div>
  )
}
