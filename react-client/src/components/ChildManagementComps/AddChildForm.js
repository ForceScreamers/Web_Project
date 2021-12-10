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
            <option value="age_1">1</option>
            <option value="age_2">2</option>
            <option value="age_3">3</option>
            <option value="age_4">4</option>
            <option value="age_5">5</option>
            <option value="age_6">6</option>
          </select>

          <input type="submit" value="הוספה" />
        </div>
      </form>
    </div>
  )
}

export default AddChildForm
