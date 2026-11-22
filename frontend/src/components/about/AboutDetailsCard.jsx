import '../../styles/pages/About.css'

export default function AboutDetailsCard({heading,content,icon,index}) {
    return (
        <article className="about-detail-card">
            <div className="detail-card-heading">
                <span className="detail-card-icon" aria-hidden="true">{icon}</span>
                <span className="detail-card-index">{index}</span>
            </div>
            <h2>{heading}</h2>
            <div className="detail-card-content">{content}</div>
        </article>
    );
} 