export default function ShelterFilter() {
    return (
        <div className="accountCard">
            <h1>Filter</h1>
            <form>
                <div className='columnPair'>
                    <label htmlFor="pet-type">Type</label>
                    <select
                        id="pet-type"
                        name='petType'
                        // value={formData.petType}
                        // onChange={handleChange}
                        >
                        <option value=""></option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Small Mammal">Small Mammal</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}