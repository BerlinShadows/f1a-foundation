export default function AnimatedGradientText({
    children,
    size = '6rem',
}: {
    children: string;
    size?: string;
}) {
    return (
        <h1
            style={{
                fontSize: size,
                fontWeight: 800,
                background: 'linear-gradient(90deg, var(--accent), var(--gradient-end), var(--accent))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 3s ease infinite',
                margin: 0,
            }}
        >
            {children}
        </h1>
    );
}