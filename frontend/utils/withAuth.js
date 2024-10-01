import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user')); // Adjust this key if necessary

            console.log(user)
            if (!user.token) {
                router.push('/login'); // Redirect to login if no token is found
            } else {
                setLoading(false); // Set loading to false if token exists
            }
        }, [router]);

        if (loading) {
            return <div>Loading...</div>; // You can replace this with a loading spinner
        }
        return <WrappedComponent {...props} />;
    };
    return AuthenticatedComponent;
};

export default withAuth;
