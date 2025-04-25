function BrowsingFilter() {

return(<div className='accountCard'>
<h1>Filter</h1>
<form>
<label >Gender</label>
  <select id="gender" name="gender">
  <option value={"both"}>Both</option>
  <option value={"male"}>Male</option>
  <option value={"female"}>Female</option></select>
  <label >What species of animals do you want to see?</label>
  <select id="animalType" name="animalType">
  <option value={"all"}>All</option>
  <option value={"dog"}>Dog</option>
  <option value={"cat"}>Cat</option>
  <option value={"other"}>Other</option>
  </select>
  <label>Minimum Age</label>
  <input type="number" min="0" max="25" value="0" />
  <label>Maximum Age</label>
  <input type="number" min="0" max="25" value="25" />
  <fieldset>
    <legend>What Personality Type Are You Looking For?</legend>
    <input type="checkbox" id="friendly" name="personality" value="friendly" />
    <label for="Friendly">Friendly</label><br />

    <input type="checkbox" id="curious" name="personality"  value="curious" />
    <label for="curious">Curious</label><br />
    <input type="checkbox" id="energetic" name="personality"  value="energetic" />
    <label for="energetic">Energetic</label>
    <input type="checkbox" id="houseTrained" name="personality"  value="houseTrained" />
    <label for="houseTrained">House Trained</label>
  </fieldset>
  <button type="submit">Submit</button>
</form>
</div>)
}

export default BrowsingFilter;