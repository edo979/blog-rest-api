import { useNavigation } from 'react-router-dom'

export function ShowServerState() {
  const navigation = useNavigation()

  return (
    <div className="hstack gap-2 my-3">
      {navigation.state === 'submitting' && <i>Saving data...</i>}
      {navigation.state === 'loading' && <i>Redirecting to posts...</i>}
      {navigation.state !== 'idle' && (
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  )
}
