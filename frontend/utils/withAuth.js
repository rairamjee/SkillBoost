import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user')); 
            // const token=user.token
            console.log(user)
            if (!user) {
                router.push('/login'); 
            } else {
                setLoading(false); 
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
