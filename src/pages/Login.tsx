import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            // Send credential to backend for verification
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    credential: credentialResponse.credential,
                }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                // Store token and user info
                login(data.token, data.user);
                navigate('/admin');
            } else {
                alert(data.error || 'Accesso negato. Email non autorizzata.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Errore durante il login. Riprova.');
        }
    };

    const handleError = () => {
        console.error('Login Failed');
        alert('Login fallito. Riprova.');
    };

    return (
        <main className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
            <div className="container py-20">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-custom-lg p-8 md:p-12">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full mb-4">
                                <Shield size={32} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Area Admin</h1>
                            <p className="text-gray-600">
                                Accedi con il tuo account Google autorizzato
                            </p>
                        </div>

                        {/* Google Login Button */}
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                useOneTap
                                theme="filled_blue"
                                size="large"
                                text="signin_with"
                                shape="rectangular"
                            />
                        </div>

                        {/* Info */}
                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Nota:</strong> Solo gli account email autorizzati possono accedere
                                all'area admin.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
