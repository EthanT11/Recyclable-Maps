const EntryField = props => {
  return (
    <div className="EntryFieldGen">
      <input
        type="text"
        value={props.value}
        onChange={event => console.log("value changed!")}
        placeholder="Name"
      />
    </div>
  );
};

export default EntryField;
