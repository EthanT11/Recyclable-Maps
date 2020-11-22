const EntryField3 = props => {
  return (
    <div className="EntryFieldGen">
      <input
        type="text"
        value={props.value}
        onChange={event => console.log("value changed!")}
        placeholder="Hours of Operation"
      />
    </div>
  );
};

export default EntryField3;