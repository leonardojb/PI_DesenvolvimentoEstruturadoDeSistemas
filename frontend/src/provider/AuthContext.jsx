/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useState,
    useEffect,
    useContext,
} from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../firebase";

const AuthContext = createContext({
    user: null,
    setUser: null,
    loading: true,
    handleLogout: () => { },
    handleLogin: () => { }
});

export const AuthProvider = (
    props,
) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth)
            .then(() => {
                setUser(null);
                window.open
            })
            .catch((error) => {
                console.error("Erro ao desconectar usuário:", error);
            });
    };

    const handleLogin = async (email, password) => {
        if (!email || !password) {
            alert("Campos obrigatórios!")
        }
        const auth = getAuth(firebaseApp);
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            setUser(res?.user)
        }).catch((error) => {
            console.error('Erro ao fazer login:', error);
            alert("Erro no login", error)
        });


    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, handleLogout, handleLogin }}>
            {props?.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
