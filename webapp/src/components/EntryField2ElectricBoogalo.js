const EntryField2 = props => {
  return (
    <div className="EntryFieldDes">
      <input
        type="text"
        value={props.value}
        onChange={event => console.log("value changed!")}
        placeholder="Description"
      />
    </div>
  );
};

export default EntryField2;