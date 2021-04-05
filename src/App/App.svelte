<script lang="ts">
  import { GoogleAnalytics } from "@beyonk/svelte-google-analytics";
  import { Router, Route } from "svelte-routing";

  import Orb from "@app/Orb";

  import Home from "./routes/Home";
  import Edit from "./routes/Edit";
  import Preview from "./routes/Preview";
</script>

<GoogleAnalytics
  properties={[import.meta.env.SNOWPACK_PUBLIC_GOOGLE_ANALYTICS_ID]}
/>

<Orb />

<main>
  <Router>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/edit/:id" let:params>
      <Edit id={params.id} />
    </Route>
    <Route path="/preview/:id" let:params>
      <Preview id={params.id} />
    </Route>
  </Router>
</main>

<style>
  main {
    max-width: 900px;
    width: 90%;
    margin: 0 auto;
  }
</style>
