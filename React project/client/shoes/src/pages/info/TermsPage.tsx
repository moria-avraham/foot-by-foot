import { Data } from "../../Data"

const TermsPage = () => {
    return (
        <div> {Data.map((data) => {
            return <><h2>{data.termsTitle}</h2><p>{data.termsTextFirst}</p>
                <p>{data.termsTextSecond}</p>
                <p>{data.termsTextThird}</p>
                <p>{data.termsTextFourth}</p>
                <p>{data.termsTextFifth}</p>
            </>
        })}</div>
    )
}

export default TermsPage