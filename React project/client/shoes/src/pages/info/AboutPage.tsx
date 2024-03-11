import { Data } from "../../Data"
const AboutPage = () => {

    return (
        <>
            {Data.map((data) => {
                return <><h2>{data.aboutTitle}</h2><p>{data.aboutTextFirst}</p>
                    <p>{data.aboutTextSecond}</p>
                    <p>{data.aboutTextThird}</p>
                    <p>{data.aboutTextFourth}</p>
                    <p>{data.aboutTextFifth}</p>
                </>
            })}
        </>
    );

}

export default AboutPage