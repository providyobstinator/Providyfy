<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
const SUPABASE_URL = "https://gpighjxdwcjjnxdgqvvr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaWdoanhkd2Nqam54ZGdxdnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwOTY1OTMsImV4cCI6MjA4MTY3MjU5M30.DGS_UVANoD9k2BNGCqswwqMgDioRpFM--5rpS7IKMRE";

const supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// LOGIN
async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  const userId = data.user.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profile.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "client.html";
  }
}

// SIGNUP
async function signupUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created! Login now.");
}
</script>
