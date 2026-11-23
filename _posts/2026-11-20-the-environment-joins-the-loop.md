---
title: "Editable Visual Worlds Join the Loop"
excerpt: "Code-defined environments for adaptive training and test-time reasoning."
date: 2026-11-22
permalink: /blog/editable-visual-worlds-join-the-loop/
tags:
  - agents
  - simulation
  - interactive video
comments: false
share: false
related: false
---

Imagine getting stuck on a hard math problem. A mentor suggests several problems that isolate steps you are missing, which you solve.
You return to the original problem, and this time you quickly discover the solution.

The mentor changed what you practice in response to where you struggle. 
This is useful for training agents too. 
When a model fails during RL tuning, beyond updating weights, we can alter the situations it encounters next. 
A late warning from a video assistant might motivate practice with tighter intervention windows. 
A slipping robotic grasp might motivate cases that isolate a difficult contact condition.

Recent advances in coding agents has made online *visual environment* revision viable. 
Run rollouts, identify weaknesses, modify practice tasks suitably, and repeat.
This further extends to test-time compute. 
Constructing live executable environments and experimenting with possible actions within this digital twin is now a possibility. 
This aligns with human reasoning too; revisit the last time you played pool when you possibly imagined the many possibilities before taking a shot. 
Building and running a simulation can become part of the agent's test-time reasoning.

These are two key ways that *visual environments join the loop*: adaptive practice during training, and online simulation as test time compute. 
Coding agents make the continuous revision of these environments realistic. 
We explore these ideas taking **live video assistance** and **robotic control** as case studies.

<style>
.page__content figure { margin: 20px 0; }
.page__content figure > a { width: 100%; }
.page__content figure img,
.page__content figure iframe,
.page__content figure .fluid-width-video-wrapper { display: block; margin-bottom: 0; }
.page__content figure figcaption { width: 100%; margin: 8px 0 0; min-height: 0; }
.page__content figure + h2,
.page__content figure + h3 { margin-top: 24px; }
.pool-opening-demo { display:block; width:100%; height:620px; border:1px solid #dedfd5; border-radius:12px; background:#f5f2ea; }
@media (max-width:600px) { .pool-opening-demo { height:500px; } }
</style>
<figure>
  <iframe class="pool-opening-demo" src="/assets/blog/pool-opening/index.html" title="Think before the shot: explore possible pool shots, then play one" loading="eager"></iframe>
  <figcaption class="page__meta">Try possible shots before choosing one. A simplified illustration of simulation as part of thinking.</figcaption>
</figure>

## A familiar idea: try before acting

Robotics and reinforcement learning have a long history of using predictive models to examine the consequences of actions and improve behavior ([Jordan and Rumelhart](https://people.eecs.berkeley.edu/~jordan/papers/distal.pdf); [Dyna](https://mlanthology.org/icml/1990/sutton1990icml-integrated/)). Works such as [Dreamer](https://openreview.net/pdf?id=S1lOTC4tDS) further demonstrate how model-generated experience can improve agent behavior.

Alongside latent world models, explicit executable environments offer inspectable objects, rules, and parameters ([WorldCoder](https://arxiv.org/abs/2402.12275)), while physics engines provide a foundation for capturing task-relevant physical dynamics. A further shift is agent-driven revision: agents construct or modify these environments in response to learning failures ([ACCEL](https://proceedings.mlr.press/v162/parker-holder22a.html), [EnvGen](https://arxiv.org/abs/2403.12014), [Eurekaverse](https://arxiv.org/abs/2411.01775), [WEDGE](https://arxiv.org/abs/2610.19420)) or new observations ([Twin](https://arxiv.org/abs/2608.14490), [EMPIRIC](https://arxiv.org/abs/2609.35047)). 
These advances motivate integrating online environment modification directly into learning and reasoning. 

<figure>
  <a href="/assets/blog/environment-loop/history-connection.png" aria-label="Open figure at full resolution"><img src="/assets/blog/environment-loop/history-connection.png" alt="Comparison of a controller and forward model, Dyna and Dreamer with learned world models, and a policy whose practice environment a coding agent revises in response to failures." loading="lazy" style="width:100%; height:auto;" width="1920" height="1080"></a>
  <figcaption class="page__meta">Related approaches to learning from consequences. Failure-driven revision of an executable environment can complement learned world models.</figcaption>
</figure>

## The environment became easier to revise

Coding agents have made editting simulators much easier while allowing extreme levels of detailed modification. 
Karpathy’s [A Long-expected Party](https://karpathy.ai/lotr-movie/) illustrates how specific a generated scene can be, and especially how coding agents can perform highly detailed edits that are unrealistic for humans to perform. 


In robotics, works like [RoboGen](https://generativesimulation.github.io/) and [RoboCasa](https://arxiv.org/abs/2406.02523) already automate parts of environment and task creation, providing foundations for the online, failure-driven revision.
Recent [Interactive Visual Gym](https://arxiv.org/abs/2611.08286) studies closed-loop assistance through executable environments and responsive simulated users for live video assistants. 
The ability to quickly edit environments (or simulated humans within then) gives us control over the practice conditions.

The kitchen below illustrates a simple case of environment controls. Two animated hands prepare a burger while a rule-based assistant provides guidance. Change the ingredient order, response delay, or distraction level, and observe whether the intervention changes the outcome. 

<style>
.practice-demo { width:100%; height:680px; border:1px solid #e7e5e4; border-radius:10px; background:#fafaf9; }
@media (max-width:720px) { .practice-demo { height:900px; } }
</style>
<figure>
  <iframe class="practice-demo" src="/assets/blog/kitchen-patch/index.html" title="Interactive procedural guidance: patch a kitchen and change the timing of advice" loading="lazy"></iframe>
  <figcaption class="page__meta">An illustrative, rule-based example. Scene changes, user behavior, and intervention timing are editable parts of the practice problem.</figcaption>
</figure>

## Two ways the environment joins the loop

Editable visual worlds can dynamically change what an agent practices or help explore the decision-space at inference. 
Both involve rapidly constructing or modifying the visual environment continuously.

<style>
.environment-loops { margin: 20px 0; }
.environment-loops__tabs { display: flex; gap: 1.5rem; border-bottom: 1px solid #b5c0b6; margin-bottom: 1rem; }
.environment-loops__tabs[hidden], .environment-loops__panel[hidden] { display: none; }
.environment-loops__tab { appearance: none; background: transparent; border: 0; border-bottom: 3px solid transparent; border-radius: 0; padding: .65rem .1rem; margin-bottom: -1px; color: #65726c; font: inherit; font-weight: 600; cursor: pointer; }
.environment-loops__tab[aria-selected="true"] { color: #24796e; border-bottom-color: #24796e; }
.environment-loops__tab:last-child[aria-selected="true"] { color: #d96339; border-bottom-color: #d96339; }
.environment-loops__tab:focus-visible { outline: 2px solid #24796e; outline-offset: 4px; }
.environment-loops__panel img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; }
.environment-loops__panel figure { margin: 0; }
.environment-loops__panel figcaption { min-height: 0; margin-top: 8px; }
@media print {
  .environment-loops__tabs { display: none; }
  .environment-loops__panel[hidden] { display: block; }
  .environment-loops__panel { break-inside: avoid; margin-bottom: 1em; }
}
</style>
<div class="environment-loops" id="environment-loops">
  <div class="environment-loops__tabs" aria-label="Two uses of editable environments" hidden>
    <button class="environment-loops__tab" id="loop-tab-training" type="button" aria-controls="loop-panel-training">During training</button>
    <button class="environment-loops__tab" id="loop-tab-test-time" type="button" aria-controls="loop-panel-test-time">At test time</button>
  </div>
  <div class="environment-loops__panel" id="loop-panel-training">
    <figure>
      <a href="/assets/blog/environment-loop/failure-to-practice.png" aria-label="Open training diagram at full resolution"><img src="/assets/blog/environment-loop/failure-to-practice.png" alt="Training and environment revision: rollouts feed RL updates and failure analysis; a coding agent edits practice environments, and validated changes return to training." loading="lazy" width="1920" height="1080"></a>
      <figcaption class="page__meta">Failures guide new practice; accepted environments feed further policy learning.</figcaption>
    </figure>
  </div>
  <div class="environment-loops__panel" id="loop-panel-test-time">
    <figure>
      <a href="/assets/blog/environment-loop/test-time-simulation.png" aria-label="Open test-time diagram at full resolution"><img src="/assets/blog/environment-loop/test-time-simulation.png" alt="Simulation as part of thinking: observe a situation, construct a task-relevant environment, try actions, inspect outcomes, and choose a real action, checking the model against new observations." loading="lazy" width="1920" height="1080"></a>
      <figcaption class="page__meta">Simulated outcomes guide the current action; new observations check the model.</figcaption>
    </figure>
  </div>
</div>
<script>
(function () {
  var root = document.getElementById('environment-loops');
  if (!root) return;
  var tablist = root.querySelector('.environment-loops__tabs');
  var tabs = Array.from(root.querySelectorAll('.environment-loops__tab'));
  var panels = Array.from(root.querySelectorAll('.environment-loops__panel'));
  function select(index, focus) {
    tabs.forEach(function (tab, i) {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  tablist.setAttribute('role', 'tablist');
  tabs.forEach(function (tab, index) {
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener('click', function () { select(index, false); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(next, true); }
    });
  });
  select(0, false);
  tablist.hidden = false;
})();
</script>

### During training: failures shape the next practice

We revisit our live video assistance case study. 
Each practice episode (during RL tuning phase) should target a weakness while remaining within reach of the current model. 
The successful and failed rollouts jointly guide what the assistant already handles, where it sometimes succeeds, and which situations require simpler intermediate practice. 
Work such as [EnvGen](https://arxiv.org/abs/2403.12014), [Eurekaverse](https://arxiv.org/abs/2411.01775), and [WEDGE](https://arxiv.org/abs/2610.19420) uses performance feedback to target subsequent practice. 
Coding agents are capable of modifications at even higher detail and abstraction. 
We illustrate some examples relevant to our earlier simple kitchen environment.

| Missing Skill | Example Modification |
|---|---|
| Procedural dependencies | Modified recipe where an ingredient substitution changes required steps |
| Long-term consequences | Skip early step causing problems several steps later |
| Identify invalid plan | Missing some equipment requires a modified procedure |
| Failure Recovery | Human misunderstands instruction, creating a recoverable mistake |

Coding agents enable automating the entire process of discovering such missing skills from prior rollouts, and constructing suitable modified tasks for the subsequent rollouts. 
This new setting allows unlocking powerful training strategies for visual agents. 

### At test time: simulation becomes part of thinking

Next lets discuss test-time simulation in the context of robot control. 
An editable environment becomes part of how the robot thinks through a new situation. 
It builds simulations covering what matters for the current decision, and rehearses possible actions within multiple variants of those visual worlds. This spends test-time compute on exploration within editable visual worlds.

Consider peeling a banana, where too little grip creates slipping, but too much damages the fruit. 
Our animation below lets you vary attributes of both the policy and the world, illustrating the extended scope of test-time exploration.

<figure>
  <iframe class="practice-demo" src="/assets/blog/banana-peel/index.html" title="Robotic banana peeling: vary softness, grip force, and peel resistance" loading="lazy"></iframe>
  <figcaption class="page__meta">A scripted deformation and control illustration. Force, slip, and damage are heuristic, unitless signals, not measured physics. It does not model material fracture or demonstrate a learned robotic policy.</figcaption>
</figure>

We outline one possible test-time exploration for our same banana example:

| Step | Description | Supporting tools |
| --- | --- | --- |
| Reconstruct | Initial estimate of banana's shape and robots grasp | Depth or multi-view reconstruction |
| Identify physics | Estimate attributes like friction, stiffness, or peel resistance |  Coding agent world knowledge integrated with physics engines like [Isaac Sim](https://docs.isaacsim.omniverse.nvidia.com/latest/physics/simulation_fundamentals.html) or [MuJoCo](https://mujoco.readthedocs.io/en/stable/modeling.html) |
| Rehearse | Compare grip-and-pull actions across plausible material properties. | Coding agent modifies environment and executes robot policy |
| Test and repeat | Observe and analyse the new rollouts. | Visual and environment-state based feedback used by coding agent |

The infrastructure for this full automated pipline now exists. Agents can assemble, test, and revise task-specific simulations iteratively at test-time. 
Works like [EMPIRIC](https://arxiv.org/abs/2609.35047) provide a foundation for this direction of test-time environment modification.

## What this all means

Visual environment design can now become part of the iterative agent improvement loop. 
We observe an agent’s skill level and failure modes, and modify the visual world suitably. 
Similar environment or task modification is already established in non-visual tasks such as [theorem proving](https://arxiv.org/abs/2502.00212), [code reasoning](https://arxiv.org/abs/2505.03335), [language tasks](https://arxiv.org/abs/2510.24684), [code repair](https://arxiv.org/abs/2607.03523), and [test-time code generation](https://arxiv.org/abs/2605.23491). 
In coding tasks, these ideas have recently proven useful even for large-scale training, with [Microsoft](https://arxiv.org/html/2609.07925#S3.SS1) leveraging policy-guided task revision and [DeepSeek](https://arxiv.org/html/2609.19969v1#S5.SS1.SSS1) exploring failure-informed training-environment construction. 

The ability to similarly construct and modify *visual worlds* opens pathways to scaling up interactive visual agents. 
Recent advances in physical AI (e.g. [Tesla FSD](https://x.com/birdabo/status/2124466600476921886?s=46)) only further support this direction.
Leveraging editable visual worlds to scale both learning and test-time compute is a promising pathway to building truly inteligent interactive visual agents. 