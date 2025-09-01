// import { useState } from 'preact/hooks';

interface LinkItem {
    title: string;
    url: string;
    description: string;
    icon: string;
}

const App_section_info_links = () => {
    const links: LinkItem[] = [
        {
            title: 'Telegram',
            url: 'https://t.me/huggiesdotnear',
            description: 'Join our community chat',
            icon: '💬'
        },
        {
            title: 'Social',
            url: 'https://huggies.near.social/',
            description: 'Follow us on NEAR Social',
            icon: '🌐'
        },
        {
            title: 'Trade on Rhea',
            url: 'https://app.rhea.finance/#near|shit-1170.meme-cooking.near',
            description: 'Trade SHIT tokens',
            icon: '💱'
        }
    ];

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="info_links">
            <h3>Links</h3>
            <div className="links-grid">
                {links.map((link, index) => (
                    <div 
                        key={index} 
                        className="link-card"
                        onClick={() => handleLinkClick(link.url)}
                    >
                        <div className="link-icon">{link.icon}</div>
                        <div className="link-content">
                            <div className="link-title">{link.title}</div>
                            <div className="link-description">{link.description}</div>
                        </div>
                        <div className="link-arrow">→</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App_section_info_links;