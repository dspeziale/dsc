import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
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
        <main className="min-h-screen pt-20 flex items-center justify-center bg-[#0b1326] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="w-full max-w-md px-8 relative z-10">
                <div className="p-1 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30">
                    <div className="bg-[#131b2e] p-10 md:p-12 rounded-[inherit] shadow-2xl border border-white/5 backdrop-blur-xl">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                                <span className="material-symbols-outlined text-primary text-4xl">admin_panel_settings</span>
                            </div>
                            <h1 className="text-3xl font-headline font-bold text-slate-100 mb-3 tracking-tight">Area Riservata</h1>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Benvenuto nel centro di comando. Accedi con il tuo account autorizzato.
                            </p>
                        </div>

                        {/* Google Login Button */}
                        <div className="flex justify-center mb-10 overflow-hidden rounded-lg">
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

                        {/* Info Note */}
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 flex gap-3">
                            <span className="material-symbols-outlined text-primary text-xl shrink-0">info</span>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                <strong>Accrediti:</strong> L'accesso è limitato esclusivamente ai membri del team DSC Italy con email verificata.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Back Link */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Torna alla Home
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Login;
