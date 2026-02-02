import xss from 'xss';

export const sanitizeHtml = (content) => {
    if (typeof content === 'string') {
        return xss(content, {
            whiteList: {
                ...xss.whiteList,
                span: ['style', 'class'],
                div: ['style', 'class'],
                p: ['style', 'class'],
                img: ['src', 'alt', 'width', 'height', 'style'],
                a: ['href', 'title', 'target', 'style']
            }
        });
    }
    if (typeof content === 'object' && content !== null) {
        const sanitized = Array.isArray(content) ? [] : {};
        for (const key in content) {
            sanitized[key] = sanitizeHtml(content[key]);
        }
        return sanitized;
    }
    return content;
};
