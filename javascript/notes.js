import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFde5Hdt3CTbVw71uK89JThLPCq-6iNa8",
  authDomain: "muj-connect-d2e2b.firebaseapp.com",
  projectId: "muj-connect-d2e2b",
  storageBucket: "muj-connect-d2e2b.appspot.com",
  messagingSenderId: "790443205869",
  appId: "1:790443205869:web:020a252e60cc19ed3bd8e4",
  databaseURL: "https://muj-connect-d2e2b-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const read_data = ref(database, '/' + uid);
  onValue(read_data, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    document.getElementById('note1').innerHTML = data.notes
  }); 
  }
});

document.getElementById("clicker").addEventListener("click", function() {
    var note = document.getElementById("take-notes").value
    const uid = auth.currentUser.uid;

    set(ref(database, '/'+uid), {
      notes: note,
      user_ondo : false
      });
    document.getElementById('take-notes').value = ''
})
