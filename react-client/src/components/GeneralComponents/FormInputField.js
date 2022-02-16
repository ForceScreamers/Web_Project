export default function FormInputField({ Name, Valid, OnChange, UserErrorMessageText }) {

  return (
    <>

      <input className={Valid ? "" : "border-danger"} onChange={OnChange} name={Name} type="text" />

      {/* Split into 2 components */}
      {/* <label>{Valid ? null : UserErrorMessageText}</label> */}
    </>
  )
}