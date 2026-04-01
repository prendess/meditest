import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userScores, setUserScores] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserScores(docSnap.data().scores || {});
                } else {
                    setUserScores({});
                }
            } else {
                setUserScores({});
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signup = (username, password) => {
        const dummyEmail = `${username.toLowerCase().trim()}@meditest.app`;
        return createUserWithEmailAndPassword(auth, dummyEmail, password);
    };

    const login = (username, password) => {
        const dummyEmail = `${username.toLowerCase().trim()}@meditest.app`;
        return signInWithEmailAndPassword(auth, dummyEmail, password);
    };
    
    const logout = () => signOut(auth);

    const updateScore = async (testKey, newScore) => {
        if (!currentUser) return;
        
        const currentScore = userScores[testKey] || -1;
        if (newScore > currentScore) {
            const updatedScores = { ...userScores, [testKey]: newScore };
            setUserScores(updatedScores);
            
            await setDoc(doc(db, "users", currentUser.uid), { scores: updatedScores }, { merge: true });
        }
    };

    const value = { currentUser, userScores, signup, login, logout, updateScore };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}