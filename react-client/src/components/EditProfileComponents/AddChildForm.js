function AddChildForm({ HandleAddChild }) {
  return (
    <div>
      <form onSubmit={HandleAddChild} >

        <div className="InputContainer">
          {/* TODO: Add name validation */}
          <label>שם:</label>

          <input name="childNameField" type="text" />

          <label>גיל:</label>
          <select name="childAgeSelect">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

          <input type="submit" value="הוספה" />
        </div>
      </form>
    </div>
  )
}

export default AddChildForm
