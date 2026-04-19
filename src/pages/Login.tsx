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
        <main className="min-h-screen pt-20 flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="w-full max-w-md px-8 relative z-10">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-primary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-slate-900 p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-white/5 backdrop-blur-xl">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 group-hover:bg-emerald-500 transition-all duration-700">
                                <span className="material-symbols-outlined text-emerald-400 text-5xl group-hover:text-slate-900">admin_panel_settings</span>
                            </div>
                            <h1 className="text-4xl font-headline font-bold text-white mb-4 tracking-tight">Area Riservata</h1>
                            <p className="text-slate-400 text-base leading-relaxed font-light">
                                Authenticate via secure node. <br/>Accesso limitato al core team.
                            </p>
                        </div>

                        {/* Google Login Button */}
                        <div className="flex justify-center mb-12 overflow-hidden rounded-2xl border border-white/10 p-2 bg-white/5">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                useOneTap
                                theme="filled_blue"
                                size="large"
                                text="signin_with"
                                shape="pill"
                            />
                        </div>

                        {/* Info Note */}
                        <div className="p-6 bg-slate-800/40 rounded-2xl border border-white/5 flex gap-4">
                            <span className="material-symbols-outlined text-emerald-400 text-2xl shrink-0">info</span>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium uppercase tracking-wider">
                                <strong>Security Protocol:</strong> L'accesso è limitato esclusivamente ai membri del team DSC Italy con email verificata dal sistema.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Back Link */}
                <div className="mt-10 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-emerald-400 text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 mx-auto"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Torna alla Home
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Login;
