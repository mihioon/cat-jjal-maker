import React from "react";

const Form = ({ updateMainCat }) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value, setValue] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    function handleInputChange(e) {
        const userValue = e.target.value;
        if (includesHangul(userValue)) {
            setErrorMessage("한글은 입력할 수 없습니다.");
            return;
        } else {
            setErrorMessage("");
        }

        setValue(userValue.toUpperCase());
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        if (value == '') {
            setErrorMessage("빈값불가.");
            return;
        }

        updateMainCat(value);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="name"
                placeholder="영어 대사를 입력해주세요"
                value={value}
                onChange={handleInputChange}
            />
            <button type="submit">생성</button>
            <p style={{ color: "red" }} >{errorMessage}</p>
        </form >
    );
}

export default Form;