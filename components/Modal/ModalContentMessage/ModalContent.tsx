import Button from '@/UI/Button/Button';

export default function ModalContentMessage({response, setShowModal}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <div>
        { response && response.errorFieldValidation && response.errorFieldValidation.profilePicture
          ? response.errorFieldValidation.profilePicture
          : null
        }
        { response && response.errorMessage ? response.errorMessage : null }
        { response && response.successMessage ? response.successMessage : null }
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: 12,
        justifyContent: "center",
      }}>
        <Button
          className="button"
          text="OK"
          onClick={() => setShowModal({
            success: false,
            error: false,
          })}
          type="button"
        />
      </div>
    </div>
  )
}