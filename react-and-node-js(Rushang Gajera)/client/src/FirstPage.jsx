import Welcome from './Welcome'
import ProfileCard from './ProfileCard'

export default function FirstPage() {

    return (
        <>

            <div>
                <Welcome
                    name="Rushang Gajera"
                    rollNumber="Id-234"
                />
            </div>
            <br />
            <div>
                <p> Profile Component </p>
            </div>
            <br />
            <div>
                <ProfileCard
                    name="B-Tech"
                    course="Ce"
                    batch="2025"
                />
                <br />
                <ProfileCard
                    name="B-Tech"
                    course="Ce"
                    batch="2024"
                />
                <br />
                <ProfileCard
                    name="B-Tech"
                    course="Ce"
                    batch="2025"
                />
            </div>

        </>
    )
}