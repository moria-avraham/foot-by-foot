import { Data } from "../../Data"

const TermsOfUsePage = () => {
    return (<>
        {
            Data.map((data) => {
                return <><h2>{data.termsUseTitle}</h2><p>{data.termsUseText}</p>

                </>
            })
        }
    </>
    )
}

export default TermsOfUsePage