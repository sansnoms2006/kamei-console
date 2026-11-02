/* Kamei Game Console — Kamei Events: tournois du mois (affiches, compte à rebours, calendrier),
   inscriptions / check-in, badges 🥇🥈🥉 par jeu (règle B), palmarès, et l'interface admin pour créer les events. */
(function () {
  const L = {
    fr: {
      evLobby: "🎮 Aller dans la salle de départ", evShare: "🎥 Partager mon jeu avec la régie", evRegie: "🎬 Ouvrir la régie (PC)", evBoard: "⏱️ Classement en direct", evRunning: "en course", evDnf: "abandon", evRomBad: "version différente",
      navEvents: "Events", evTitle: "Kamei Events", evNone: "Pas encore de tournoi ce mois-ci. Reviens bientôt 👀", evCreate: "＋ Créer un event",
      evDays: ["L", "M", "M", "J", "V", "S", "D"],
      ph: { draft: "Brouillon", reg: "Inscriptions ouvertes", closed: "Inscriptions fermées", checkin: "Check-in ouvert", live: "🔴 En cours", done: "🏁 Terminé", cancelled: "Annulé" },
      cdReg: "Inscriptions encore ouvertes : ", cdStart: "Début dans ", cdCheck: "Check-in ouvert · début dans ", cdLive: "🔴 Le tournoi est en cours", cdDone: "🏁 Tournoi terminé", cdCancel: "Tournoi annulé", cdDraft: "Brouillon : seul toi le vois",
      kinds: { speedrun: "⏱️ Speedrun", combat: "🥊 Combat", br: "🪂 Battle royale", other: "🎮 Tournoi" },
      teams: ["Solo", "Duo", "Trio", "Squad"],
      places: (n, s) => `${n} / ${s} places`, waiting: (n) => `${n} en liste d'attente`,
      defends: (p, m) => `${p} ${m} défend son titre`, defended: (n) => (n ? ` · défendu ${n} fois` : ""),
      evGame: "Jeu", evWhen: "Date", evRules: "Règlement", evPlayers: "Joueurs inscrits", evWaitList: "Liste d'attente", evNoPlayers: "Personne pour l'instant. Sois le premier !",
      evStake: "🏅 Badges en jeu", evStakeHint: "Les joueurs qui ont un badge sur ce jeu et qui s'inscrivent le remettent en jeu : 1er, 2e ou 3e → ils prennent le badge de leur place ; 4e ou plus → ils le perdent.",
      evStakeNone: "Aucun détenteur de badge inscrit pour l'instant.", evResults: "🏁 Classement final",
      evReg: "📝 S'inscrire", evUnreg: "Se désinscrire", evCheck: "✅ Check-in : je suis là !", evChecked: "✅ Présence confirmée", evKey: "🔑 Voir la clé du match",
      evMine: "Tu es inscrit ✅", evMineWait: (n) => `Tu es en liste d'attente (n°${n})`, evTeamQ: "Nom de ton équipe", evTeamHint: "Tes coéquipiers doivent s'inscrire avec exactement le même nom d'équipe.",
      evRisk: (m) => `Tu as le badge ${m} sur ce jeu. En t'inscrivant, tu le remets en jeu : si tu finis 1er, 2e ou 3e tu prends le badge de ta place, si tu finis 4e ou plus tu le perds. On y va ?`,
      evRegOk: "Inscription confirmée ! 🎉", evRegWait: "C'est complet : tu es en liste d'attente. Si quelqu'un se désinscrit, tu prends sa place.", evUnregOk: "Tu es désinscrit.",
      evUnregQ: "Tu veux vraiment te désinscrire ?", evCheckOk: "Présence confirmée ✅ Bonne chance !", evKeyIs: "Clé du match", evKeyNone: "L'admin n'a pas encore donné la clé.",
      evAppGame: (g, s) => `🎮 Jeu de l'appli : ${g}${s ? " (" + s + ")" : ""}`, evMissing: "⚠️ Ce jeu n'est pas encore sur ta console : ajoute-le avant le tournoi.",
      evExt: "🕹️ Se joue sur ta console / ton PC", evLogin: "Connecte-toi pour t'inscrire.",
      err: { closed: "Les inscriptions sont fermées.", too_late: "Trop tard : le tournoi a commencé.", not_now: "Le check-in n'est pas encore ouvert.", not_registered: "Tu n'es pas inscrit à ce tournoi.",
        too_early: "La clé sera visible 5 minutes avant le début.", banned: "Ton compte est bloqué.", already_done: "Ce tournoi est déjà terminé.", event_locked: "Ce tournoi est terminé : il ne peut plus être modifié." },
      // admin
      adEdit: "✏️ Modifier", adPublish: "🚀 Publier", adStart: "🔴 Lancer le tournoi", adFinal: "🏁 Classement final", adCancel: "❌ Annuler le tournoi", adDelete: "🗑️ Supprimer", adRepost: "📣 Reposter sur Discord",
      adCancelQ: "Annuler ce tournoi ? Les joueurs le verront comme « Annulé ».", adDeleteQ: "Supprimer définitivement ce tournoi (et ses inscriptions) ?",
      fNew: "Nouvel event", fEdit: "Modifier l'event", fName: "Nom du tournoi", fNamePh: "Coupe Kamei de novembre", fGame: "Jeu", fGamePh: "Super Mario Kart, Fortnite…",
      fPlat: "Où se joue le jeu ?", fPlatApp: "Dans l'appli Kamei Console", fPlatExt: "Sur console / PC (Fortnite, CoD…)", fKind: "Format", fTeam: "Équipes", fSlots: "Nombre de places",
      fBest: "Manches gagnantes (combat)", fBestO: { 1: "1 manche", 3: "2 manches gagnantes (BO3)", 5: "3 manches gagnantes (BO5)" },
      fPts: "Points battle royale", fPtsHint: "Victoire / Top 5 / Top 10 / Top 25 / par élimination",
      fStart: "📅 Début du tournoi", fEnd: "📝 Fin des inscriptions", fCheck: "Check-in avant le début", fCheckO: { 0: "Pas de check-in", 15: "15 min", 30: "30 min", 60: "1 h" },
      fKey: "🔑 Clé / code du match (privé)", fKeyHint: "Montrée seulement aux inscrits, 5 min avant le début. Tu peux la mettre plus tard.",
      fRules: "Règlement", fPoster: "🖼️ Affiche", fPosterPick: "Choisir une image", fPosterHint: "Format portrait conseillé (4:5). L'image est compressée automatiquement.",
      fPreview: "👀 Aperçu", fBack: "← Modifier", fDraft: "💾 Brouillon", fPub: "🚀 Publier", fSave: "💾 Enregistrer",
      fNeed: "Remplis le nom, le jeu et les dates.", fDates: "La fin des inscriptions doit être avant le début.", fSaving: "Enregistrement…", fPubOk: "Event publié ! Les joueurs sont prévenus 🎉", fSaved: "Enregistré ✅",
      fDiscordOff: "Publié. (Discord : ajoute le secret DISCORD_EVENTS_CHANNEL pour les annonces.)",
      rulesDef: {
        speedrun: "• Même jeu et même version pour tout le monde.\n• Départ synchronisé 3-2-1-GO, le chrono s'arrête quand tu appuies sur « 🏁 Fini » à la fin du jeu.\n• Sauvegardes rapides, retour arrière, accéléré et codes de triche interdits (bloqués automatiquement).\n• En cas de doute, l'admin regarde la rediffusion et décide.",
        combat: "• Tableau à élimination directe, tirage au sort.\n• Matchs en 2 manches gagnantes (finale en 3).\n• Les deux joueurs confirment le gagnant. En cas de désaccord, l'admin tranche.\n• 10 min de retard = match perdu.",
        br: "• Partie privée : la clé est donnée aux inscrits juste avant le début.\n• Points : victoire 10, top 5 = 7, top 10 = 5, top 25 = 2, +1 par élimination.\n• Envoie une capture de ton écran de fin pour chaque partie.\n• Pas de team illégale, pas de triche : exclusion directe.",
        other: "• Sois fair-play 🙂\n• L'admin a le dernier mot en cas de litige.",
      },
      fin: "Classement final", finHint: "Donne une place à chaque joueur. 1er, 2e et 3e reçoivent le badge de leur place ; les détenteurs qui finissent 4e ou plus perdent leur badge.",
      finPlace: "Place", finScore: "Temps / score", finGo: "✅ Valider le classement", finChanges: "Changements de badges :", finNoChange: "Aucun changement de badge.",
      finDup: "Deux joueurs ont la même place.", finQ: "Valider ? Les badges seront mis à jour automatiquement et les joueurs prévenus.", finOk: "Classement validé, badges mis à jour 🏅",
      finWin: (m) => `gagne ${m}`, finDown: (a, b) => `${a} → ${b}`, finLose: (m) => `perd ${m}`, finKeep: (m) => `garde ${m}`,
      // palmarès
      pmTitle: "🏆 Palmarès", pmOf: (p) => `🏆 Palmarès de ${p}`, pmNone: "Pas encore de tournoi joué.", pmPlayed: (n) => `${n} tournoi${n > 1 ? "s" : ""}`, pmBadge: "Badge actuel",
      pmNoBadge: "Pas de badge pour l'instant", pmHist: "Historique", pmPlace: (p) => (p ? `${p}${p === 1 ? "er" : "e"}` : "—"),
    },
    nl: {
      evLobby: "🎮 Naar de startruimte", evShare: "🎥 Mijn spel delen met de regie", evRegie: "🎬 Regie openen (pc)", evBoard: "⏱️ Live klassement", evRunning: "bezig", evDnf: "opgegeven", evRomBad: "andere versie",
      navEvents: "Events", evTitle: "Kamei Events", evNone: "Nog geen toernooi deze maand. Kom snel terug 👀", evCreate: "＋ Event maken",
      evDays: ["M", "D", "W", "D", "V", "Z", "Z"],
      ph: { draft: "Concept", reg: "Inschrijvingen open", closed: "Inschrijvingen gesloten", checkin: "Check-in open", live: "🔴 Bezig", done: "🏁 Afgelopen", cancelled: "Geannuleerd" },
      cdReg: "Inschrijven kan nog: ", cdStart: "Start over ", cdCheck: "Check-in open · start over ", cdLive: "🔴 Het toernooi is bezig", cdDone: "🏁 Toernooi afgelopen", cdCancel: "Toernooi geannuleerd", cdDraft: "Concept: alleen jij ziet het",
      kinds: { speedrun: "⏱️ Speedrun", combat: "🥊 Gevecht", br: "🪂 Battle royale", other: "🎮 Toernooi" },
      teams: ["Solo", "Duo", "Trio", "Squad"],
      places: (n, s) => `${n} / ${s} plaatsen`, waiting: (n) => `${n} op de wachtlijst`,
      defends: (p, m) => `${p} ${m} verdedigt zijn titel`, defended: (n) => (n ? ` · ${n}× verdedigd` : ""),
      evGame: "Spel", evWhen: "Datum", evRules: "Reglement", evPlayers: "Ingeschreven spelers", evWaitList: "Wachtlijst", evNoPlayers: "Nog niemand. Wees de eerste!",
      evStake: "🏅 Badges op het spel", evStakeHint: "Spelers met een badge voor dit spel die zich inschrijven, zetten hem op het spel: 1e, 2e of 3e → ze krijgen de badge van hun plaats; 4e of slechter → ze verliezen hem.",
      evStakeNone: "Nog geen badgehouder ingeschreven.", evResults: "🏁 Eindklassement",
      evReg: "📝 Inschrijven", evUnreg: "Uitschrijven", evCheck: "✅ Check-in: ik ben er!", evChecked: "✅ Aanwezigheid bevestigd", evKey: "🔑 Matchcode bekijken",
      evMine: "Je bent ingeschreven ✅", evMineWait: (n) => `Je staat op de wachtlijst (nr. ${n})`, evTeamQ: "Naam van je team", evTeamHint: "Je teamgenoten moeten zich met exact dezelfde teamnaam inschrijven.",
      evRisk: (m) => `Je hebt de badge ${m} voor dit spel. Door je in te schrijven zet je hem op het spel: 1e, 2e of 3e → je krijgt de badge van je plaats, 4e of slechter → je verliest hem. Doen?`,
      evRegOk: "Inschrijving bevestigd! 🎉", evRegWait: "Het is vol: je staat op de wachtlijst. Als iemand zich uitschrijft, krijg jij zijn plaats.", evUnregOk: "Je bent uitgeschreven.",
      evUnregQ: "Wil je je echt uitschrijven?", evCheckOk: "Aanwezigheid bevestigd ✅ Succes!", evKeyIs: "Matchcode", evKeyNone: "De admin heeft de code nog niet gegeven.",
      evAppGame: (g, s) => `🎮 Spel in de app: ${g}${s ? " (" + s + ")" : ""}`, evMissing: "⚠️ Dit spel staat nog niet op je console: voeg het toe voor het toernooi.",
      evExt: "🕹️ Wordt gespeeld op je console / pc", evLogin: "Log in om je in te schrijven.",
      err: { closed: "De inschrijvingen zijn gesloten.", too_late: "Te laat: het toernooi is begonnen.", not_now: "De check-in is nog niet open.", not_registered: "Je bent niet ingeschreven.",
        too_early: "De code is 5 minuten voor de start zichtbaar.", banned: "Je account is geblokkeerd.", already_done: "Dit toernooi is al afgelopen.", event_locked: "Dit toernooi is afgelopen en kan niet meer gewijzigd worden." },
      adEdit: "✏️ Wijzigen", adPublish: "🚀 Publiceren", adStart: "🔴 Toernooi starten", adFinal: "🏁 Eindklassement", adCancel: "❌ Toernooi annuleren", adDelete: "🗑️ Verwijderen", adRepost: "📣 Opnieuw op Discord",
      adCancelQ: "Dit toernooi annuleren?", adDeleteQ: "Dit toernooi (en de inschrijvingen) definitief verwijderen?",
      fNew: "Nieuw event", fEdit: "Event wijzigen", fName: "Naam van het toernooi", fNamePh: "Kamei Cup november", fGame: "Spel", fGamePh: "Super Mario Kart, Fortnite…",
      fPlat: "Waar wordt het gespeeld?", fPlatApp: "In de Kamei Console-app", fPlatExt: "Op console / pc (Fortnite, CoD…)", fKind: "Formaat", fTeam: "Teams", fSlots: "Aantal plaatsen",
      fBest: "Gewonnen rondes (gevecht)", fBestO: { 1: "1 ronde", 3: "2 gewonnen rondes (BO3)", 5: "3 gewonnen rondes (BO5)" },
      fPts: "Battle royale-punten", fPtsHint: "Winst / Top 5 / Top 10 / Top 25 / per eliminatie",
      fStart: "📅 Start van het toernooi", fEnd: "📝 Einde inschrijvingen", fCheck: "Check-in voor de start", fCheckO: { 0: "Geen check-in", 15: "15 min", 30: "30 min", 60: "1 u" },
      fKey: "🔑 Matchcode (privé)", fKeyHint: "Alleen zichtbaar voor ingeschrevenen, 5 min voor de start. Mag ook later.",
      fRules: "Reglement", fPoster: "🖼️ Affiche", fPosterPick: "Afbeelding kiezen", fPosterHint: "Liefst staand (4:5). De afbeelding wordt automatisch gecomprimeerd.",
      fPreview: "👀 Voorbeeld", fBack: "← Wijzigen", fDraft: "💾 Concept", fPub: "🚀 Publiceren", fSave: "💾 Opslaan",
      fNeed: "Vul de naam, het spel en de datums in.", fDates: "Het einde van de inschrijvingen moet voor de start liggen.", fSaving: "Opslaan…", fPubOk: "Event gepubliceerd! De spelers zijn verwittigd 🎉", fSaved: "Opgeslagen ✅",
      fDiscordOff: "Gepubliceerd. (Discord: voeg het secret DISCORD_EVENTS_CHANNEL toe voor aankondigingen.)",
      rulesDef: {
        speedrun: "• Zelfde spel en versie voor iedereen.\n• Gesynchroniseerde start 3-2-1-GO, de chrono stopt als je op « 🏁 Klaar » drukt.\n• Snel opslaan, terugspoelen, versnellen en cheats verboden (automatisch geblokkeerd).\n• Bij twijfel bekijkt de admin de herhaling.",
        combat: "• Knock-outschema, loting.\n• 2 gewonnen rondes (finale 3).\n• Beide spelers bevestigen de winnaar. Bij onenigheid beslist de admin.\n• 10 min te laat = verloren.",
        br: "• Privématch: de code wordt vlak voor de start gegeven.\n• Punten: winst 10, top 5 = 7, top 10 = 5, top 25 = 2, +1 per eliminatie.\n• Stuur een screenshot van je eindscherm.\n• Valsspelen = uitsluiting.",
        other: "• Wees fair-play 🙂\n• De admin heeft het laatste woord.",
      },
      fin: "Eindklassement", finHint: "Geef elke speler een plaats. 1e, 2e en 3e krijgen de badge van hun plaats; badgehouders die 4e of slechter eindigen verliezen hem.",
      finPlace: "Plaats", finScore: "Tijd / score", finGo: "✅ Klassement bevestigen", finChanges: "Badgewijzigingen:", finNoChange: "Geen badgewijzigingen.",
      finDup: "Twee spelers hebben dezelfde plaats.", finQ: "Bevestigen? De badges worden automatisch bijgewerkt en de spelers verwittigd.", finOk: "Klassement bevestigd, badges bijgewerkt 🏅",
      finWin: (m) => `wint ${m}`, finDown: (a, b) => `${a} → ${b}`, finLose: (m) => `verliest ${m}`, finKeep: (m) => `houdt ${m}`,
      pmTitle: "🏆 Erelijst", pmOf: (p) => `🏆 Erelijst van ${p}`, pmNone: "Nog geen toernooi gespeeld.", pmPlayed: (n) => `${n} toernooi${n > 1 ? "en" : ""}`, pmBadge: "Huidige badge",
      pmNoBadge: "Nog geen badge", pmHist: "Geschiedenis", pmPlace: (p) => (p ? `${p}e` : "—"),
    },
    en: {
      evLobby: "🎮 Go to the start room", evShare: "🎥 Share my game with the control room", evRegie: "🎬 Open the control room (PC)", evBoard: "⏱️ Live ranking", evRunning: "running", evDnf: "gave up", evRomBad: "different version",
      navEvents: "Events", evTitle: "Kamei Events", evNone: "No tournament this month yet. Check back soon 👀", evCreate: "＋ Create an event",
      evDays: ["M", "T", "W", "T", "F", "S", "S"],
      ph: { draft: "Draft", reg: "Sign-ups open", closed: "Sign-ups closed", checkin: "Check-in open", live: "🔴 Live", done: "🏁 Finished", cancelled: "Cancelled" },
      cdReg: "Sign-ups still open: ", cdStart: "Starts in ", cdCheck: "Check-in open · starts in ", cdLive: "🔴 The tournament is live", cdDone: "🏁 Tournament finished", cdCancel: "Tournament cancelled", cdDraft: "Draft: only you can see it",
      kinds: { speedrun: "⏱️ Speedrun", combat: "🥊 Fighting", br: "🪂 Battle royale", other: "🎮 Tournament" },
      teams: ["Solo", "Duo", "Trio", "Squad"],
      places: (n, s) => `${n} / ${s} spots`, waiting: (n) => `${n} on the waiting list`,
      defends: (p, m) => `${p} ${m} is defending the title`, defended: (n) => (n ? ` · defended ${n}×` : ""),
      evGame: "Game", evWhen: "Date", evRules: "Rules", evPlayers: "Registered players", evWaitList: "Waiting list", evNoPlayers: "Nobody yet. Be the first!",
      evStake: "🏅 Badges at stake", evStakeHint: "Players holding a badge for this game who sign up put it at stake: 1st, 2nd or 3rd → they take the badge of their place; 4th or worse → they lose it.",
      evStakeNone: "No badge holder signed up yet.", evResults: "🏁 Final ranking",
      evReg: "📝 Sign up", evUnreg: "Withdraw", evCheck: "✅ Check-in: I'm here!", evChecked: "✅ Presence confirmed", evKey: "🔑 Show the match key",
      evMine: "You're signed up ✅", evMineWait: (n) => `You're on the waiting list (#${n})`, evTeamQ: "Your team name", evTeamHint: "Your teammates must sign up with exactly the same team name.",
      evRisk: (m) => `You hold the ${m} badge for this game. Signing up puts it at stake: 1st, 2nd or 3rd → you take the badge of your place, 4th or worse → you lose it. Go?`,
      evRegOk: "You're signed up! 🎉", evRegWait: "It's full: you're on the waiting list. If someone withdraws, you take their spot.", evUnregOk: "You withdrew.",
      evUnregQ: "Do you really want to withdraw?", evCheckOk: "Presence confirmed ✅ Good luck!", evKeyIs: "Match key", evKeyNone: "The admin hasn't given the key yet.",
      evAppGame: (g, s) => `🎮 In-app game: ${g}${s ? " (" + s + ")" : ""}`, evMissing: "⚠️ This game isn't on your console yet: add it before the tournament.",
      evExt: "🕹️ Played on your console / PC", evLogin: "Log in to sign up.",
      err: { closed: "Sign-ups are closed.", too_late: "Too late: the tournament has started.", not_now: "Check-in isn't open yet.", not_registered: "You're not signed up.",
        too_early: "The key shows up 5 minutes before the start.", banned: "Your account is blocked.", already_done: "This tournament is already finished.", event_locked: "This tournament is finished and can't be edited." },
      adEdit: "✏️ Edit", adPublish: "🚀 Publish", adStart: "🔴 Start the tournament", adFinal: "🏁 Final ranking", adCancel: "❌ Cancel the tournament", adDelete: "🗑️ Delete", adRepost: "📣 Repost on Discord",
      adCancelQ: "Cancel this tournament?", adDeleteQ: "Delete this tournament (and its sign-ups) for good?",
      fNew: "New event", fEdit: "Edit event", fName: "Tournament name", fNamePh: "Kamei November Cup", fGame: "Game", fGamePh: "Super Mario Kart, Fortnite…",
      fPlat: "Where is it played?", fPlatApp: "In the Kamei Console app", fPlatExt: "On console / PC (Fortnite, CoD…)", fKind: "Format", fTeam: "Teams", fSlots: "Number of spots",
      fBest: "Rounds to win (fighting)", fBestO: { 1: "1 round", 3: "Best of 3", 5: "Best of 5" },
      fPts: "Battle royale points", fPtsHint: "Win / Top 5 / Top 10 / Top 25 / per elimination",
      fStart: "📅 Tournament start", fEnd: "📝 Sign-up deadline", fCheck: "Check-in before start", fCheckO: { 0: "No check-in", 15: "15 min", 30: "30 min", 60: "1 h" },
      fKey: "🔑 Match key / code (private)", fKeyHint: "Only shown to registered players, 5 min before the start. You can add it later.",
      fRules: "Rules", fPoster: "🖼️ Poster", fPosterPick: "Pick an image", fPosterHint: "Portrait works best (4:5). The image is compressed automatically.",
      fPreview: "👀 Preview", fBack: "← Edit", fDraft: "💾 Draft", fPub: "🚀 Publish", fSave: "💾 Save",
      fNeed: "Fill in the name, the game and the dates.", fDates: "The sign-up deadline must be before the start.", fSaving: "Saving…", fPubOk: "Event published! Players have been notified 🎉", fSaved: "Saved ✅",
      fDiscordOff: "Published. (Discord: add the DISCORD_EVENTS_CHANNEL secret for announcements.)",
      rulesDef: {
        speedrun: "• Same game and version for everyone.\n• Synced 3-2-1-GO start, the timer stops when you press « 🏁 Done ».\n• Save states, rewind, fast-forward and cheats are forbidden (locked automatically).\n• When in doubt, the admin checks the replay.",
        combat: "• Single elimination bracket, random draw.\n• Best of 3 (final best of 5).\n• Both players confirm the winner. If they disagree, the admin decides.\n• 10 min late = match lost.",
        br: "• Private match: the key is given right before the start.\n• Points: win 10, top 5 = 7, top 10 = 5, top 25 = 2, +1 per elimination.\n• Send a screenshot of your end screen.\n• Cheating = disqualification.",
        other: "• Be fair-play 🙂\n• The admin has the final word.",
      },
      fin: "Final ranking", finHint: "Give each player a place. 1st, 2nd and 3rd get the badge of their place; holders who finish 4th or worse lose theirs.",
      finPlace: "Place", finScore: "Time / score", finGo: "✅ Confirm the ranking", finChanges: "Badge changes:", finNoChange: "No badge change.",
      finDup: "Two players have the same place.", finQ: "Confirm? Badges are updated automatically and players are notified.", finOk: "Ranking confirmed, badges updated 🏅",
      finWin: (m) => `wins ${m}`, finDown: (a, b) => `${a} → ${b}`, finLose: (m) => `loses ${m}`, finKeep: (m) => `keeps ${m}`,
      pmTitle: "🏆 Trophies", pmOf: (p) => `🏆 ${p}'s trophies`, pmNone: "No tournament played yet.", pmPlayed: (n) => `${n} tournament${n > 1 ? "s" : ""}`, pmBadge: "Current badge",
      pmNoBadge: "No badge yet", pmHist: "History", pmPlace: (p) => (p ? `#${p}` : "—"),
    },
  };
  for (const k in L) Object.assign(I18N[k], { navEvents: L[k].navEvents });
  const T = () => L[lang] || L.fr;

  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  const MEDAL = ["", "🥇", "🥈", "🥉"];
  const BR_POINTS = { win: 10, top5: 7, top10: 5, top25: 2, kill: 1 };
  const LOCALE = { fr: "fr-BE", nl: "nl-BE", en: "en-GB" };
  const avatar = (p, n) => (window.kameiAvatar ? window.kameiAvatar(p, n) : "");
  const posterUrl = (p) => (p ? (p.startsWith("blob:") ? p : sb.storage.from("posters").getPublicUrl(p).data.publicUrl) : "");
  const sysLabel = (s) => (typeof SYSTEMS !== "undefined" && SYSTEMS[s] ? SYSTEMS[s].label : s || "");
  const errMsg = (e) => { const m = String((e && e.message) || e || ""); const k = Object.keys(T().err).find((x) => m.includes(x)); return k ? T().err[k] : m; };

  const st = document.createElement("style");
  st.textContent = `
  #v-events .evhead { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  #v-events .evhead h2 { margin: 6px 0 12px; }
  .evcal { background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 10px 12px 12px; margin-bottom: 16px; }
  .evcal .mh { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .evcal .mh b { font-size: 15px; text-transform: capitalize; }
  .evcal .mh button { width: 34px; height: 34px; border-radius: 10px; border: 0; background: rgba(255,255,255,.06); color: var(--text); font-size: 18px; }
  .evcal .g { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
  .evcal .g small { color: var(--muted); font-size: 10.5px; font-weight: 700; padding: 2px 0; }
  .evcal .g button { position: relative; height: 34px; border: 0; border-radius: 10px; background: none; color: var(--text); font: 600 13px Inter, sans-serif; }
  .evcal .g button.out { visibility: hidden; }
  .evcal .g button.today { box-shadow: inset 0 0 0 1.5px var(--tacc, #9BD14B); }
  .evcal .g button.has { background: color-mix(in srgb, var(--tacc, #9BD14B) 20%, transparent); color: var(--tacc, #9BD14B); font-weight: 800; }
  .evcal .g button.has::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; background: var(--tacc, #9BD14B); }
  .evcal .g button.past { opacity: .45; }
  .evc { position: relative; display: block; width: 100%; padding: 0; border-radius: 22px; overflow: hidden; background: #16181d; border: 1px solid var(--line); margin-bottom: 18px; color: #fff; text-align: left; font: inherit; }
  .evc.dim { opacity: .72; }
  .evc .pimg { display: block; width: 100%; aspect-ratio: 4 / 5; max-height: 72vh; object-fit: cover; background: #111; }
  .evc .pfake { display: flex; flex-direction: column; justify-content: flex-start; padding-top: 18% !important; align-items: center; gap: 16px; width: 100%; aspect-ratio: 4 / 5; max-height: 72vh; padding: 24px; text-align: center; }
  .evc .pfake .pt { font-family: "Press Start 2P", monospace; font-size: clamp(16px, 5.4vw, 26px); line-height: 1.5; text-shadow: 3px 3px 0 rgba(0,0,0,.45); }
  .evc .pfake .pg { font-size: 13px; letter-spacing: 3px; text-transform: uppercase; font-weight: 800; opacity: .85; }
  .evc .pfake .pe { font-size: 84px; filter: drop-shadow(0 6px 10px rgba(0,0,0,.4)); }
  .pf-speedrun { background: radial-gradient(circle at 30% 20%, #3b82f6, transparent 60%), linear-gradient(160deg, #0f2a5c, #0b0f1e); }
  .pf-combat { background: radial-gradient(circle at 70% 20%, #ef4444, transparent 60%), linear-gradient(160deg, #5c0f1a, #12080b); }
  .pf-br { background: radial-gradient(circle at 50% 10%, #a855f7, transparent 60%), linear-gradient(160deg, #3b0f5c, #0d0817); }
  .pf-other { background: radial-gradient(circle at 40% 20%, #f59e0b, transparent 60%), linear-gradient(160deg, #5c3b0f, #120d06); }
  .evc .top { position: absolute; top: 12px; left: 12px; right: 12px; display: flex; gap: 6px; flex-wrap: wrap; }
  .evchip { display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 999px; background: rgba(0,0,0,.6); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); font: 700 12px Inter, sans-serif; color: #fff; }
  .evchip.live { background: #e11d48; } .evchip.reg { background: color-mix(in srgb, var(--tacc, #9BD14B) 85%, #000); color: #0b0b12; } .evchip.check { background: #f59e0b; color: #0b0b12; }
  .evc .ov { position: absolute; left: 0; right: 0; bottom: 0; padding: 70px 14px 14px; background: linear-gradient(transparent, rgba(0,0,0,.6) 30%, rgba(0,0,0,.92)); }
  .evc .ov h3 { margin: 0 0 4px; font-size: 21px; font-weight: 800; line-height: 1.2; }
  .evc .ov .when { font-size: 13px; opacity: .85; }
  .evcd { margin-top: 10px; padding: 9px 12px; border-radius: 12px; background: rgba(255,255,255,.12); font: 700 13.5px Inter, sans-serif; font-variant-numeric: tabular-nums; }
  .evcd.reg { background: color-mix(in srgb, var(--tacc, #9BD14B) 26%, rgba(0,0,0,.4)); }
  .evdef { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px; }
  .evdef span { padding: 4px 9px; border-radius: 999px; background: rgba(245,179,1,.2); border: 1px solid rgba(245,179,1,.55); font: 700 12px Inter, sans-serif; color: #ffd76a; }
  .evbar { margin-top: 10px; height: 6px; border-radius: 4px; background: rgba(255,255,255,.15); overflow: hidden; }
  .evbar b { display: block; height: 100%; background: var(--tacc, #9BD14B); border-radius: 4px; }
  .evmeta { display: flex; justify-content: space-between; gap: 8px; margin-top: 5px; font-size: 12px; opacity: .85; }
  .evd .pimg, .evd .pfake { border-radius: 18px; max-height: 46vh; }
  .evd .evc { margin-bottom: 12px; }
  .evd h4 { margin: 16px 0 8px; font-size: 13px; color: var(--muted); letter-spacing: .5px; text-transform: uppercase; }
  .evd .rules { white-space: pre-wrap; font-size: 14px; line-height: 1.5; background: rgba(255,255,255,.04); padding: 12px; border-radius: 14px; }
  .evd .info { font-size: 14px; margin: 4px 0; }
  .evpl { display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 12px; background: rgba(255,255,255,.035); margin-bottom: 6px; }
  .evpl b { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .evpl .pl { width: 34px; text-align: center; font: 800 15px Inter, sans-serif; }
  .evpl small { color: var(--muted); }
  .evpod { display: grid; grid-template-columns: 1fr 1.15fr 1fr; align-items: end; gap: 8px; margin: 6px 0 12px; text-align: center; }
  .evpod div { background: rgba(255,255,255,.05); border-radius: 14px; padding: 10px 4px; display: grid; justify-items: center; gap: 4px; font-size: 13px; }
  .evpod div.p1 { padding-bottom: 22px; background: rgba(245,179,1,.14); }
  .evpod .m { font-size: 26px; }
  .evstake { background: rgba(245,179,1,.08); border: 1px solid rgba(245,179,1,.35); border-radius: 14px; padding: 10px 12px; }
  .evstake p { margin: 0 0 8px; font-size: 12.5px; color: var(--muted); line-height: 1.45; }
  .evact { display: grid; gap: 8px; margin: 12px 0 4px; }
  .evkey { font: 800 22px "Press Start 2P", monospace; letter-spacing: 2px; text-align: center; padding: 18px 10px; border-radius: 14px; background: #0b0b12; border: 1.5px dashed var(--tacc, #9BD14B); user-select: all; word-break: break-all; }
  .evf label { display: block; font-size: 12.5px; font-weight: 700; color: var(--muted); margin: 12px 0 5px; }
  .evf input, .evf select, .evf textarea { width: 100%; box-sizing: border-box; padding: 11px 12px; border-radius: 12px; border: 1px solid var(--line); background: #0f1115; color: var(--text); font: 500 15px Inter, sans-serif; }
  .evf textarea { min-height: 120px; resize: vertical; line-height: 1.45; }
  .evf .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .evf .pts { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
  .evf .pts input { padding: 9px 4px; text-align: center; }
  .evf .pprev { margin-top: 8px; display: flex; gap: 10px; align-items: center; }
  .evf .pprev img { width: 72px; height: 90px; object-fit: cover; border-radius: 10px; }
  .evf .hint { margin: 5px 0 0; }
  .evfin .evpl select { width: 70px; padding: 7px; border-radius: 10px; background: #0f1115; color: var(--text); border: 1px solid var(--line); }
  .evfin .evpl input { width: 92px; padding: 7px; border-radius: 10px; background: #0f1115; color: var(--text); border: 1px solid var(--line); }
  .pmg { background: var(--panel, rgba(255,255,255,.04)); border: 1px solid var(--line); border-radius: 16px; padding: 12px; margin-bottom: 10px; }
  .pmg .hd { display: flex; align-items: center; gap: 12px; }
  .pmg .bd { font-size: 40px; line-height: 1; width: 48px; text-align: center; }
  .pmg .bd.no { font-size: 28px; opacity: .35; }
  .pmg .cnt { display: flex; gap: 10px; font-size: 13px; margin-top: 4px; flex-wrap: wrap; }
  .pmg details { margin-top: 8px; font-size: 13px; }
  .pmg details summary { color: var(--muted); cursor: pointer; }
  .pmg .hr { display: flex; justify-content: space-between; gap: 8px; padding: 5px 0; border-bottom: 1px solid var(--line); }`;
  document.head.appendChild(st);

  /* ---------- time helpers ---------- */
  const now = () => Date.now();
  function phaseOf(e) {
    if (["draft", "done", "cancelled"].includes(e.status)) return e.status;
    const s = Date.parse(e.starts_at), r = Date.parse(e.reg_end);
    if (e.status === "live" || now() >= s) return "live";
    if (e.checkin_min > 0 && now() >= s - e.checkin_min * 60000) return "checkin";
    if (now() < r) return "reg";
    return "closed";
  }
  function dur(ms) {
    ms = Math.max(0, ms);
    const d = Math.floor(ms / 86400000), h = Math.floor(ms / 3600000) % 24, m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
    const j = lang === "en" ? "d" : lang === "nl" ? "d" : "j", u = lang === "nl" ? "u" : "h";
    if (d > 0) return `${d} ${j} ${h} ${u} ${String(m).padStart(2, "0")} min`;
    if (h > 0) return `${h} ${u} ${String(m).padStart(2, "0")} min`;
    return `${m} min ${String(s).padStart(2, "0")} s`;
  }
  function cdText(e) {
    const X = T(), p = phaseOf(e), s = Date.parse(e.starts_at);
    if (p === "reg") return X.cdReg + dur(Date.parse(e.reg_end) - now());
    if (p === "closed") return X.cdStart + dur(s - now());
    if (p === "checkin") return X.cdCheck + dur(s - now());
    return { live: X.cdLive, done: X.cdDone, cancelled: X.cdCancel, draft: X.cdDraft }[p] || "";
  }
  const fmtDate = (iso, opt) => new Date(iso).toLocaleString(LOCALE[lang] || "fr-BE", opt || { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
  const toLocalInput = (iso) => { const d = new Date(iso); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };
  const fromLocalInput = (v) => (v ? new Date(v).toISOString() : null);

  let ticker = null;
  function tick() {
    let refresh = false;
    document.querySelectorAll("[data-cd]").forEach((el) => {
      const e = cache.get(+el.dataset.cd) || (draftPreview && draftPreview.id === el.dataset.cd ? draftPreview : null);
      if (!e) return;
      const p = phaseOf(e);
      if (el.dataset.ph && el.dataset.ph !== p) refresh = true;
      el.dataset.ph = p; el.textContent = cdText(e);
      el.className = "evcd " + (p === "reg" ? "reg" : "");
    });
    if (refresh && view && view.offsetParent) render(view);
    if (!document.querySelector("[data-cd]")) { clearInterval(ticker); ticker = null; }
  }
  const startTicker = () => { if (!ticker) ticker = setInterval(tick, 1000); };

  /* ---------- data ---------- */
  const cache = new Map();
  let view = null, ym = (() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; })(), list = [], draftPreview = null;
  async function fetchMonth() {
    const from = new Date(ym.y, ym.m, 1), to = new Date(ym.y, ym.m + 1, 1);
    const r = await sb.rpc("event_list", { from_ts: from.toISOString(), to_ts: to.toISOString() });
    if (r.error) throw r.error;
    list = r.data || [];
    for (const e of list) cache.set(e.id, e);
    return list;
  }
  async function fetchOne(id) {
    const r = await sb.rpc("event_get", { eid: id });
    if (r.error) throw r.error;
    if (r.data) cache.set(r.data.id, r.data);
    return r.data;
  }

  /* ---------- poster card ---------- */
  function poster(e, cls) {
    const X = T(), p = phaseOf(e);
    const img = e.poster ? `<img class="pimg" src="${esc(posterUrl(e.poster))}" alt="" loading="lazy">`
      : `<div class="pfake pf-${esc(e.kind)}"><div class="pe">${{ speedrun: "⏱️", combat: "🥊", br: "🪂", other: "🏆" }[e.kind] || "🏆"}</div></div>`;
    const chip = { live: "live", reg: "reg", checkin: "check" }[p] || "";
    const defs = (e.defenders || []).slice(0, 4).map((d) => `<span>🛡️ ${esc(X.defends(d.pseudo, MEDAL[d.rank]))}</span>`).join("");
    const n = e.count || 0, pct = Math.min(100, Math.round((n / e.slots) * 100));
    const mine = e.mine ? `<span class="evchip">${e.mine.waitlist ? "⏳" : "✅"}</span>` : "";
    return `<button class="evc ${cls || ""} ${["done", "cancelled"].includes(p) ? "dim" : ""}" data-ev="${e.id}">${img}
      <div class="top"><span class="evchip ${chip}">${esc(X.ph[p])}</span><span class="evchip">${esc(X.kinds[e.kind] || e.kind)}</span>${e.team_size > 1 ? `<span class="evchip">${X.teams[e.team_size - 1]}</span>` : ""}${mine}</div>
      <div class="ov"><h3>${esc(e.title)}</h3><div class="when">${esc(e.game)} · ${esc(fmtDate(e.starts_at))}</div>
        ${defs ? `<div class="evdef">${defs}</div>` : ""}
        <div class="evcd ${p === "reg" ? "reg" : ""}" data-cd="${e.id}" data-ph="${p}">${esc(cdText(e))}</div>
        ${["done", "cancelled"].includes(p) ? "" : `<div class="evbar"><b style="width:${pct}%"></b></div><div class="evmeta"><span>${X.places(n, e.slots)}</span><span>${e.waiting ? X.waiting(e.waiting) : ""}</span></div>`}
      </div></button>`;
  }

  function fixImgs(root) {
    root.querySelectorAll(".evc img.pimg").forEach((img) => {
      const bad = () => img.replaceWith(Object.assign(document.createElement("div"), { className: "pfake pf-other", innerHTML: '<div class="pe">🏆</div>' }));
      if (img.complete && !img.naturalWidth) bad(); else img.onerror = bad;
    });
  }

  /* ---------- month calendar ---------- */
  function calendar() {
    const X = T(), first = new Date(ym.y, ym.m, 1), days = new Date(ym.y, ym.m + 1, 0).getDate();
    const off = (first.getDay() + 6) % 7, today = new Date();
    const byDay = {};
    for (const e of list) { const d = new Date(e.starts_at); (byDay[d.getDate()] = byDay[d.getDate()] || []).push(e); }
    let cells = X.evDays.map((d) => `<small>${d}</small>`).join("");
    for (let i = 0; i < off; i++) cells += `<button class="out" tabindex="-1"></button>`;
    for (let d = 1; d <= days; d++) {
      const isToday = today.getFullYear() === ym.y && today.getMonth() === ym.m && today.getDate() === d;
      const evs = byDay[d], past = new Date(ym.y, ym.m, d + 1) < today;
      cells += `<button class="${isToday ? "today" : ""} ${evs ? "has" : ""} ${past ? "past" : ""}" ${evs ? `data-day="${evs[0].id}"` : "disabled"}>${d}</button>`;
    }
    const name = first.toLocaleString(LOCALE[lang] || "fr-BE", { month: "long", year: "numeric" });
    return `<div class="evcal"><div class="mh"><button id="evPrev" aria-label="‹">‹</button><b>${esc(name)}</b><button id="evNext" aria-label="›">›</button></div><div class="g">${cells}</div></div>`;
  }

  /* ---------- the Events tab ---------- */
  async function render(v) {
    view = v;
    const X = T(), u = me();
    if (!v.querySelector(".evhead")) v.innerHTML = `<div class="evhead"><h2 class="vtitle">${X.evTitle}</h2></div><div id="evBody"><p class="hint">…</p></div>`;
    try { await fetchMonth(); }
    catch (e) { v.querySelector("#evBody").innerHTML = `<p class="hint err">${esc(errMsg(e))}</p>`; return; }
    const order = { live: 0, checkin: 1, reg: 2, closed: 3, draft: 4, done: 5, cancelled: 6 };
    const sorted = list.slice().sort((a, b) => (order[phaseOf(a)] - order[phaseOf(b)]) || (Date.parse(a.starts_at) - Date.parse(b.starts_at)));
    v.querySelector(".evhead").innerHTML = `<h2 class="vtitle">${X.evTitle}</h2>${u && u.is_admin ? `<button class="mini" id="evNew">${X.evCreate}</button>` : ""}`;
    v.querySelector("#evBody").innerHTML = calendar() +
      (sorted.length ? sorted.map((e) => poster(e)).join("") : `<div class="vlogin"><p>${X.evNone}</p></div>`);
    const nb = v.querySelector("#evNew"); if (nb) nb.onclick = () => form();
    v.querySelector("#evPrev").onclick = () => { ym = ym.m === 0 ? { y: ym.y - 1, m: 11 } : { y: ym.y, m: ym.m - 1 }; render(v); };
    v.querySelector("#evNext").onclick = () => { ym = ym.m === 11 ? { y: ym.y + 1, m: 0 } : { y: ym.y, m: ym.m + 1 }; render(v); };
    v.querySelectorAll("[data-day]").forEach((b) => b.onclick = () => {
      const c = v.querySelector(`.evc[data-ev="${b.dataset.day}"]`); if (c) c.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    v.querySelectorAll(".evc[data-ev]").forEach((b) => b.onclick = () => detail(+b.dataset.ev));
    fixImgs(v);
    startTicker();
    paintBadge();
  }

  /* ---------- event page ---------- */
  function playerRow(p, extra) {
    return `<div class="evpl">${extra || ""}${avatar(p, 34)}<b>${esc(p.pseudo)}${p.team ? ` <small>· ${esc(p.team)}</small>` : ""}</b>${p.badge ? `<span title="badge">${MEDAL[p.badge]}</span>` : ""}${p.checked_in ? "<small>✅</small>" : ""}</div>`;
  }
  async function detail(id) {
    const X = T();
    openSheet(`<div class="evd"><p class="hint">…</p></div>`);
    let e;
    try { e = await fetchOne(id); } catch (err) { openSheet(`<p class="hint err">${esc(errMsg(err))}</p><div class="btns"><button onclick="closeSheet()">←</button></div>`); return; }
    if (!e) return closeSheet();
    const u = me(), p = phaseOf(e), admin = u && u.is_admin;
    const players = (e.players || []).filter((x) => !x.waitlist), wait = (e.players || []).filter((x) => x.waitlist);
    const ref = e.game_ref || {};
    const haveGame = e.platform !== "app" || !ref.title || (typeof games !== "undefined" && games.some((g) => g.title === ref.title || (ref.system && g.system === ref.system && g.title.toLowerCase() === String(ref.title).toLowerCase())));
    let acts = "";
    if (!u) acts = `<p class="hint">${X.evLogin}</p><button class="row ok-row" id="eLogin">${t("login")}</button>`;
    else if (e.mine) {
      const pos = e.mine.waitlist ? wait.findIndex((x) => x.id === u.id) + 1 : 0;
      acts += `<div class="row" style="text-align:center;font-weight:700">${e.mine.waitlist ? X.evMineWait(pos) : X.evMine}</div>`;
      if (!e.mine.waitlist && (p === "checkin" || (p === "live" && e.checkin_min > 0)) && !e.mine.checked_in) acts += `<button class="row ok-row" id="eCheck">${X.evCheck}</button>`;
      if (e.mine.checked_in) acts += `<div class="hint" style="text-align:center">${X.evChecked}</div>`;
      if (!e.mine.waitlist && e.platform === "ext" && e.has_key && (p === "live" || Date.parse(e.starts_at) - now() < 5 * 60000)) acts += `<button class="row ok-row" id="eKey">${X.evKey}</button>`;
      if (!e.mine.waitlist && e.platform === "app" && e.kind === "speedrun" && ["closed", "checkin", "live"].includes(p) && window.kameiRace) acts += `<button class="row ok-row" id="eLobby">${X.evLobby}</button>`;
      if (!e.mine.waitlist && e.platform === "ext" && ["checkin", "live"].includes(p) && window.kameiRace && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia && !window.kameiRace.sharing()) acts += `<button class="row" id="eShare">${X.evShare}</button>`;
      if (["reg", "closed", "checkin"].includes(p) && e.status === "open") acts += `<button class="row danger" id="eUnreg">${X.evUnreg}</button>`;
    } else if (e.status === "open" && now() < Date.parse(e.reg_end) && p !== "live") acts += `<button class="row ok-row" id="eReg">${X.evReg}</button>`;
    const adm = admin ? `<h4>Admin</h4><div class="evact">
        ${["open", "live"].includes(e.status) ? `<button class="row ok-row" id="aRegie">${X.evRegie}</button>` : ""}
        ${e.status !== "done" ? `<button class="row" id="aEdit">${X.adEdit}</button>` : ""}
        ${e.status === "draft" ? `<button class="row ok-row" id="aPub">${X.adPublish}</button>` : ""}
        ${e.status === "open" ? `<button class="row" id="aLive">${X.adStart}</button>` : ""}
        ${["open", "live"].includes(e.status) ? `<button class="row ok-row" id="aFin">${X.adFinal}</button>` : ""}
        ${e.status !== "draft" ? `<button class="row" id="aRepost">${X.adRepost}</button>` : ""}
        ${["open", "live", "draft"].includes(e.status) ? `<button class="row danger" id="aCancel">${X.adCancel}</button>` : ""}
        <button class="row danger" id="aDel">${X.adDelete}</button></div>` : "";
    const res = e.results || [];
    const podium = res.filter((r) => r.place >= 1 && r.place <= 3);
    const pod = (n) => { const r = podium.find((x) => x.place === n); return r ? `<div class="p${n}"><span class="m">${MEDAL[n]}</span>${avatar(r, 40)}<b>${esc(r.pseudo)}</b>${r.score ? `<small>${esc(r.score)}</small>` : ""}</div>` : "<div></div>"; };
    const resultsHTML = e.status === "done" ? `<h4>${X.evResults}</h4>${podium.length ? `<div class="evpod">${pod(2)}${pod(1)}${pod(3)}</div>` : ""}
      ${res.filter((r) => !(r.place >= 1 && r.place <= 3)).map((r) => playerRow(r, `<span class="pl">${r.place || "—"}</span>`).replace("</b>", `</b>${r.score ? `<small>${esc(r.score)}</small>` : ""}${r.before && !r.after ? `<small>💔${MEDAL[r.before]}</small>` : ""}`)).join("")}` : "";
    const defs = e.defenders || [];
    const stake = e.status === "done" ? "" : `<h4>${X.evStake}</h4><div class="evstake"><p>${X.evStakeHint}</p>
      ${defs.length ? defs.map((d) => `<div class="evpl">${avatar(d, 34)}<b>🛡️ ${esc(X.defends(d.pseudo, MEDAL[d.rank]))}</b><small>${X.defended(d.defended).replace(/^ · /, "")}</small></div>`).join("") : `<p style="margin:0">${X.evStakeNone}</p>`}</div>`;
    openSheet(`<div class="evd">${poster(e)}
      <div class="info"><b>${X.evGame} :</b> ${esc(e.game)} · ${esc(X.kinds[e.kind] || e.kind)}${e.team_size > 1 ? " · " + X.teams[e.team_size - 1] : ""}${e.kind === "combat" && e.best_of > 1 ? " · BO" + e.best_of : ""}</div>
      <div class="info"><b>${X.evWhen} :</b> ${esc(fmtDate(e.starts_at))}</div>
      <div class="info">${e.platform === "app" ? esc(X.evAppGame(ref.title || e.game, ref.system ? sysLabel(ref.system) : "")) : X.evExt}</div>
      ${u && !haveGame && e.status !== "done" ? `<div class="hint">${X.evMissing}</div>` : ""}
      <div class="evact">${acts}</div>
      <div id="eBoard"></div>${resultsHTML}${stake}
      ${e.rules ? `<h4>${X.evRules}</h4><div class="rules">${esc(e.rules)}</div>` : ""}
      ${e.status !== "done" ? `<h4>${X.evPlayers} (${players.length}/${e.slots})</h4>${players.length ? players.map((x) => playerRow(x)).join("") : `<p class="hint">${X.evNoPlayers}</p>`}
        ${wait.length ? `<h4>${X.evWaitList} (${wait.length})</h4>${wait.map((x, i) => playerRow(x, `<span class="pl">${i + 1}</span>`)).join("")}` : ""}` : ""}
      ${adm}<div class="btns" style="margin-top:12px"><button id="eBack">←</button></div></div>`);
    startTicker(); fixImgs(document.getElementById("sheet"));
    const $s = (x) => document.getElementById(x), on = (x, fn) => { const b = $s(x); if (b) b.onclick = fn; };
    const sheet = document.getElementById("sheet");
    const pc = sheet.querySelector(".evc"); if (pc) pc.onclick = null;
    on("eBack", () => { closeSheet(); if (view && view.offsetParent) render(view); });
    on("eLogin", () => window.kameiAccount && window.kameiAccount.open());
    on("eReg", () => register(e));
    on("eLobby", () => { closeSheet(); window.kameiRace.lobby(e); });
    on("eShare", () => { closeSheet(); window.kameiRace.share(e); });
    on("aRegie", () => { const w = window.open("regie.html?e=" + e.id, "_blank"); if (!w) location.href = "regie.html?e=" + e.id; });
    if (e.kind === "speedrun" && ["live", "done"].includes(e.status)) paintBoard(e);
    on("eUnreg", async () => {
      if (!confirm(X.evUnregQ)) return;
      const r = await sb.rpc("event_unregister", { eid: e.id });
      if (r.error) return toast(errMsg(r.error), 3500);
      toast(X.evUnregOk); detail(e.id);
    });
    on("eCheck", async () => {
      const r = await sb.rpc("event_checkin", { eid: e.id });
      if (r.error) return toast(errMsg(r.error), 3500);
      toast(X.evCheckOk); try { window.kameiVibe && window.kameiVibe(30); } catch (err) {} detail(e.id);
    });
    on("eKey", async () => {
      const r = await sb.rpc("event_key", { eid: e.id });
      if (r.error) return toast(errMsg(r.error), 3500);
      openSheet(`<h3>${X.evKeyIs}</h3>${r.data ? `<div class="evkey">${esc(r.data)}</div>` : `<p class="hint">${X.evKeyNone}</p>`}
        <div class="btns" style="margin-top:12px">${r.data ? `<button id="kCopy">${t("meCopy") || "Copier"}</button>` : ""}<button id="kBack">←</button></div>`);
      on("kBack", () => detail(e.id));
      on("kCopy", async () => { try { await navigator.clipboard.writeText(r.data); toast(t("copied")); } catch (err) {} });
    });
    // admin
    on("aEdit", () => form(e));
    on("aPub", () => publish(e.id));
    on("aLive", async () => { const r = await sb.rpc("event_set_status", { eid: e.id, st: "live" }); if (r.error) return toast(errMsg(r.error), 3500); detail(e.id); });
    on("aFin", () => finalize(e));
    on("aRepost", async () => { const r = await discordPost("event_post", e.id); toast(r ? "Discord ✅" : T().fDiscordOff, 3500); });
    on("aCancel", async () => { if (!confirm(X.adCancelQ)) return; const r = await sb.rpc("event_set_status", { eid: e.id, st: "cancelled" }); if (r.error) return toast(errMsg(r.error), 3500); detail(e.id); });
    on("aDel", async () => {
      if (!confirm(X.adDeleteQ)) return;
      const r = await sb.rpc("event_delete", { eid: e.id });
      if (r.error) return toast(errMsg(r.error), 3500);
      if (r.data) { try { await sb.storage.from("posters").remove([r.data]); } catch (err) {} }
      cache.delete(e.id); closeSheet(); if (view) render(view);
    });
  }

  async function paintBoard(e) {
    const X = T(), el = document.getElementById("eBoard"); if (!el) return;
    const r = await sb.rpc("event_board", { eid: e.id });
    if (r.error || !r.data) return;
    const fmt = window.kameiFmtTime || ((ms) => String(ms));
    const off = Date.parse(r.data.now) - now();
    const runs = (r.data.players || []).filter((x) => x.status);
    if (!runs.length || !document.getElementById("eBoard")) return;
    const done = runs.filter((x) => x.status === "done").sort((a, b) => a.ms - b.ms);
    const rest = runs.filter((x) => x.status !== "done");
    el.innerHTML = `<h4>${X.evBoard}</h4>` + done.map((x, i) => playerRow(x, `<span class="pl">${i < 3 ? MEDAL[i + 1] : i + 1}</span>`).replace("</b>", `</b><small style="font-variant-numeric:tabular-nums">${fmt(x.ms)}${x.rom_ok === false ? " ⚠️" : ""}</small>`)).join("") +
      rest.map((x) => playerRow(x, `<span class="pl">—</span>`).replace("</b>", `</b><small data-run="${Date.parse(x.go_at)}" data-st="${x.status}">${x.status === "dnf" ? X.evDnf : X.evRunning}</small>`)).join("");
    clearInterval(paintBoard.iv);
    paintBoard.iv = setInterval(() => {
      if (!document.getElementById("eBoard")) return clearInterval(paintBoard.iv);
      document.querySelectorAll("#eBoard [data-run][data-st=running]").forEach((s) => (s.textContent = "⏱️ " + fmt(now() + off - +s.dataset.run)));
    }, 100);
    clearTimeout(paintBoard.t);
    if (e.status === "live") paintBoard.t = setTimeout(() => { if (document.getElementById("eBoard") && document.getElementById("sheetBg").classList.contains("on")) paintBoard(e); }, 5000);
  }

  async function discordPost(action, id) {
    try {
      const r = await sb.functions.invoke("kamei-discord", { body: { action, id } });
      return !!(r && r.data && r.data.ok);
    } catch (e) { return false; }
  }

  async function register(e) {
    const X = T(), u = me();
    let team = null;
    if (e.team_size > 1) {
      team = prompt(X.evTeamQ + "\n" + X.evTeamHint, "");
      if (team === null) return;
      team = team.trim().slice(0, 30);
      if (!team) return;
    }
    const mine = await sb.from("badges").select("rank").eq("user_id", u.id).eq("game_key", e.game_key).maybeSingle();
    const held = mine && mine.data && mine.data.rank;
    if (held && !confirm(X.evRisk(MEDAL[held]))) return;
    const r = await sb.rpc("event_register", { eid: e.id, team_: team });
    if (r.error) return toast(errMsg(r.error), 3500);
    const d = r.data || {};
    toast(d.waitlisted ? X.evRegWait : X.evRegOk, d.waitlisted ? 5000 : 2600);
    try { window.kameiVibe && window.kameiVibe(30); } catch (err) {}
    if (d.defending && !d.waitlisted) discordPost("event_defend", e.id);
    detail(e.id);
  }

  /* ---------- admin: create / edit ---------- */
  async function compressPoster(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("image")); i.src = url; });
      const k = Math.min(1, 1350 / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      for (const q of [0.85, 0.75, 0.6]) {
        const b = await new Promise((res) => c.toBlob(res, "image/jpeg", q));
        if (b && b.size < 1900000) return b;
      }
      throw new Error("image too big");
    } finally { URL.revokeObjectURL(url); }
  }

  function form(e, keepBlob) {
    const X = T(), editing = !!(e && e.id);
    const d = Object.assign({ title: "", game: "", kind: "speedrun", platform: "app", team_size: 1, slots: 16, best_of: 3, checkin_min: 30, rules: "", points: BR_POINTS }, e || {});
    if (!editing) {
      const s = new Date(); s.setDate(s.getDate() + 7); s.setHours(20, 0, 0, 0);
      d.starts_at = s.toISOString(); d.reg_end = new Date(s.getTime() - 2 * 3600000).toISOString();
    }
    const pts = Object.assign({}, BR_POINTS, d.points || {});
    let posterBlob = keepBlob || null, posterPreview = keepBlob ? URL.createObjectURL(keepBlob) : d.poster ? posterUrl(d.poster) : "";
    const titles = typeof games !== "undefined" ? [...new Set(games.map((g) => g.title))].sort() : [];
    const opt = (v, cur, lb) => `<option value="${v}" ${String(v) === String(cur) ? "selected" : ""}>${esc(lb)}</option>`;
    openSheet(`<h3>${editing ? X.fEdit : X.fNew}</h3><div class="evf">
      <label>${X.fName}</label><input id="fTitle" maxlength="80" placeholder="${esc(X.fNamePh)}" value="${esc(d.title)}">
      <label>${X.fPlat}</label><select id="fPlat">${opt("app", d.platform, X.fPlatApp)}${opt("ext", d.platform, X.fPlatExt)}</select>
      <label>${X.fGame}</label><input id="fGame" maxlength="60" list="fGames" placeholder="${esc(X.fGamePh)}" value="${esc(d.game)}">
      <datalist id="fGames">${titles.concat(["Fortnite", "Call of Duty: Warzone", "Call of Duty: Black Ops"]).map((x) => `<option value="${esc(x)}">`).join("")}</datalist>
      <div class="two"><div><label>${X.fKind}</label><select id="fKind">${Object.keys(X.kinds).map((k) => opt(k, d.kind, X.kinds[k])).join("")}</select></div>
        <div><label>${X.fTeam}</label><select id="fTeam">${X.teams.map((n, i) => opt(i + 1, d.team_size, n)).join("")}</select></div></div>
      <div class="two"><div><label>${X.fSlots}</label><input id="fSlots" type="number" min="2" max="500" value="${d.slots}"></div>
        <div id="fBestBox"><label>${X.fBest}</label><select id="fBest">${[1, 3, 5].map((n) => opt(n, d.best_of, X.fBestO[n])).join("")}</select></div></div>
      <div id="fPtsBox"><label>${X.fPts}</label><div class="pts">${["win", "top5", "top10", "top25", "kill"].map((k) => `<input type="number" min="0" max="99" data-pt="${k}" value="${pts[k]}">`).join("")}</div><p class="hint">${X.fPtsHint}</p></div>
      <label>${X.fStart}</label><input id="fStart" type="datetime-local" value="${toLocalInput(d.starts_at)}">
      <label>${X.fEnd}</label><input id="fEnd" type="datetime-local" value="${toLocalInput(d.reg_end)}">
      <label>${X.fCheck}</label><select id="fCheck">${[0, 15, 30, 60].map((n) => opt(n, d.checkin_min, X.fCheckO[n])).join("")}</select>
      <div id="fKeyBox"><label>${X.fKey}</label><input id="fKey" maxlength="60" autocomplete="off" placeholder="—"><p class="hint">${X.fKeyHint}</p></div>
      <label>${X.fPoster}</label><button class="row" id="fPick" type="button">${X.fPosterPick}</button><input type="file" id="fFile" accept="image/*" hidden>
      <div class="pprev" id="fPrev">${posterPreview ? `<img src="${esc(posterPreview)}" alt="">` : ""}<p class="hint">${X.fPosterHint}</p></div>
      <label>${X.fRules}</label><textarea id="fRules" maxlength="4000">${esc(d.rules || X.rulesDef[d.kind] || "")}</textarea>
      <p class="hint err" id="fErr"></p>
      <div class="btns" style="margin-top:12px"><button id="fCancel">←</button><button id="fPrevBtn" class="ok">${X.fPreview}</button></div></div>`);
    const $s = (x) => document.getElementById(x);
    const sync = () => {
      const k = $s("fKind").value, ext = $s("fPlat").value === "ext";
      $s("fBestBox").style.visibility = k === "combat" ? "" : "hidden";
      $s("fPtsBox").style.display = k === "br" ? "" : "none";
      $s("fKeyBox").style.display = ext ? "" : "none";
    };
    let lastKind = d.kind;
    $s("fKind").onchange = () => {
      const r = $s("fRules"), k = $s("fKind").value;
      if (!r.value.trim() || r.value === X.rulesDef[lastKind]) r.value = X.rulesDef[k] || "";
      lastKind = k; sync();
    };
    $s("fPlat").onchange = sync; sync();
    if (editing && admin()) sb.rpc("event_admin_key", { eid: e.id }).then((r) => { if (r.data && $s("fKey")) $s("fKey").value = r.data; });
    $s("fPick").onclick = () => $s("fFile").click();
    $s("fFile").onchange = async (ev) => {
      const f = ev.target.files && ev.target.files[0]; ev.target.value = "";
      if (!f) return;
      try {
        posterBlob = await compressPoster(f);
        posterPreview = URL.createObjectURL(posterBlob);
        $s("fPrev").innerHTML = `<img src="${posterPreview}" alt=""><p class="hint">${Math.round(posterBlob.size / 1024)} Ko ✅</p>`;
      } catch (err) { $s("fErr").textContent = String(err.message || err); }
    };
    $s("fCancel").onclick = () => (editing ? detail(e.id) : closeSheet());
    $s("fPrevBtn").onclick = async () => {
      const g = $s("fGame").value.trim(), data = {
        id: editing ? e.id : null, title: $s("fTitle").value.trim(), game: g, kind: $s("fKind").value, platform: $s("fPlat").value,
        team_size: +$s("fTeam").value, slots: Math.max(2, Math.min(500, +$s("fSlots").value || 16)), best_of: +$s("fBest").value,
        checkin_min: +$s("fCheck").value, rules: $s("fRules").value.trim(), starts_at: fromLocalInput($s("fStart").value), reg_end: fromLocalInput($s("fEnd").value),
        match_key: $s("fKey").value.trim(), poster: editing ? e.poster : null,
      };
      if ($s("fKind").value === "br") { data.points = {}; document.querySelectorAll("[data-pt]").forEach((x) => (data.points[x.dataset.pt] = Math.max(0, +x.value || 0))); }
      if (data.platform === "app" && typeof games !== "undefined") {
        const m = games.find((x) => x.title.toLowerCase() === g.toLowerCase());
        data.game_ref = m ? { title: m.title, system: m.system } : { title: g };
        if (m && window.kameiRomHash) { try { data.game_ref.hash = await window.kameiRomHash(m.id); } catch (err) {} }
      }
      if (data.title.length < 2 || !g || !data.starts_at || !data.reg_end) { $s("fErr").textContent = X.fNeed; return; }
      if (Date.parse(data.reg_end) > Date.parse(data.starts_at)) { $s("fErr").textContent = X.fDates; return; }
      preview(data, posterBlob, posterPreview, e);
    };
  }
  const admin = () => { const u = me(); return !!(u && u.is_admin); };

  function preview(data, blob, prevUrl, orig) {
    const X = T();
    draftPreview = Object.assign({}, data, { id: "draft", status: orig ? orig.status : "open", count: orig ? orig.count : 0, waiting: 0, defenders: orig ? orig.defenders : [],
      poster: prevUrl ? (blob ? prevUrl : data.poster) : null });
    const isDraft = !orig || orig.status === "draft";
    openSheet(`<h3>${X.fPreview}</h3><div class="evd">${poster(draftPreview)}
      ${data.rules ? `<h4>${X.evRules}</h4><div class="rules">${esc(data.rules)}</div>` : ""}</div>
      <p class="hint" id="pSt"></p>
      <div class="btns" style="margin-top:12px"><button id="pBack">${X.fBack}</button>
        ${isDraft ? `<button id="pDraft">${X.fDraft}</button><button id="pPub" class="ok">${X.fPub}</button>` : `<button id="pSave" class="ok">${X.fSave}</button>`}</div>`);
    // the preview card shows the countdown as if it were published
    startTicker();
    const $s = (x) => document.getElementById(x);
    $s("pBack").onclick = () => form(Object.assign({}, orig || {}, data, { id: orig ? orig.id : null, poster: orig ? orig.poster : null }), blob);
    const save = async (pub) => {
      $s("pSt").textContent = X.fSaving;
      document.querySelectorAll("#sheet .btns button").forEach((b) => (b.disabled = true));
      try {
        const d = Object.assign({}, data);
        let oldPoster = null;
        if (blob) {
          const path = `ev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;
          const up = await sb.storage.from("posters").upload(path, blob, { contentType: "image/jpeg", upsert: false });
          if (up.error) throw up.error;
          oldPoster = orig && orig.poster; d.poster = path;
        }
        const r = await sb.rpc("event_save", { d });
        if (r.error) throw r.error;
        if (oldPoster && oldPoster !== d.poster) { try { await sb.storage.from("posters").remove([oldPoster]); } catch (err) {} }
        draftPreview = null;
        if (pub) return publish(r.data);
        if (orig && orig.status && orig.status !== "draft") discordPost("event_post", r.data);
        toast(X.fSaved); detail(r.data);
        if (view) render(view);
      } catch (err) {
        $s("pSt").textContent = errMsg(err);
        document.querySelectorAll("#sheet .btns button").forEach((b) => (b.disabled = false));
      }
    };
    if ($s("pDraft")) $s("pDraft").onclick = () => save(false);
    if ($s("pPub")) $s("pPub").onclick = () => save(true);
    if ($s("pSave")) $s("pSave").onclick = () => save(false);
  }

  async function publish(id) {
    const X = T();
    const r = await sb.rpc("event_set_status", { eid: id, st: "open" });
    if (r.error) return toast(errMsg(r.error), 4000);
    const ok = await discordPost("event_post", id);
    toast(ok ? X.fPubOk : X.fDiscordOff, 4500);
    try {
      const e = await fetchOne(id);
      if (e) { const d = new Date(e.starts_at); ym = { y: d.getFullYear(), m: d.getMonth() }; }
    } catch (err) {}
    detail(id);
    if (view) render(view);
  }

  /* ---------- admin: final ranking → automatic badges ---------- */
  async function finalize(e) {
    const X = T(), players = (e.players || []).filter((x) => !x.waitlist);
    // speedrun: places and times are filled in from the chronos (you can still change them)
    let pre = {};
    if (e.kind === "speedrun") {
      const r = await sb.rpc("event_board", { eid: e.id });
      const done = ((r.data && r.data.players) || []).filter((x) => x.status === "done").sort((a, b) => a.ms - b.ms);
      done.forEach((x, i) => (pre[x.id] = { place: i + 1, score: (window.kameiFmtTime || String)(x.ms) + (x.rom_ok === false ? " ⚠️" : "") }));
      players.sort((a, b) => ((pre[a.id] || { place: 999 }).place - (pre[b.id] || { place: 999 }).place));
    }
    const n = players.length;
    openSheet(`<h3>${X.fin}</h3><p class="hint">${X.finHint}</p><div class="evfin">
      ${players.map((p, i) => `<div class="evpl" data-u="${p.id}">${avatar(p, 30)}<b>${esc(p.pseudo)}${p.badge ? " " + MEDAL[p.badge] : ""}</b>
        <input placeholder="${esc(X.finScore)}" maxlength="30" data-score value="${esc((pre[p.id] || {}).score || "")}">
        <select data-place aria-label="${esc(X.finPlace)}"><option value="">—</option>${Array.from({ length: n }, (_, k) => `<option value="${k + 1}" ${(pre[p.id] || {}).place === k + 1 ? "selected" : ""}>${k + 1}</option>`).join("")}</select></div>`).join("")}
      </div><div id="finSum" class="hint" style="margin-top:10px"></div><p class="hint err" id="finErr"></p>
      <div class="btns" style="margin-top:12px"><button id="finBack">←</button><button id="finGo" class="ok">${X.finGo}</button></div>`);
    const $s = (x) => document.getElementById(x);
    const read = () => [...document.querySelectorAll("#sheet [data-u]")].map((r) => ({ id: r.dataset.u, place: +r.querySelector("[data-place]").value || null, score: r.querySelector("[data-score]").value.trim() }));
    const summary = () => {
      const rows = read(), out = [];
      for (const r of rows) {
        const p = players.find((x) => x.id === r.id), had = p.badge, now_ = r.place && r.place <= 3 ? r.place : null;
        if (!had && now_) out.push(`${esc(p.pseudo)} ${X.finWin(MEDAL[now_])}`);
        else if (had && !now_) out.push(`${esc(p.pseudo)} ${X.finLose(MEDAL[had])}`);
        else if (had && now_ !== had) out.push(`${esc(p.pseudo)} ${X.finDown(MEDAL[had], MEDAL[now_])}`);
        else if (had) out.push(`${esc(p.pseudo)} ${X.finKeep(MEDAL[had])} 🛡️`);
      }
      $s("finSum").innerHTML = `<b>${X.finChanges}</b><br>${out.length ? out.join("<br>") : X.finNoChange}`;
      return rows;
    };
    document.querySelectorAll("#sheet [data-place]").forEach((s) => s.onchange = summary);
    summary();
    $s("finBack").onclick = () => detail(e.id);
    $s("finGo").onclick = async () => {
      const rows = summary(), used = rows.filter((r) => r.place).map((r) => r.place);
      if (new Set(used).size !== used.length) { $s("finErr").textContent = X.finDup; return; }
      if (!confirm(X.finQ)) return;
      $s("finGo").disabled = true;
      const r = await sb.rpc("event_finalize", { eid: e.id, ranking: rows.filter((x) => x.place).map((x) => ({ id: x.id, place: x.place, score: x.score || null })) });
      if (r.error) { $s("finGo").disabled = false; $s("finErr").textContent = errMsg(r.error); return; }
      discordPost("event_results", e.id);
      toast(X.finOk, 3500);
      detail(e.id); if (view) render(view);
    };
  }

  /* ---------- palmarès per game ---------- */
  async function palmares(uid, pseudo, back) {
    const X = T(), u = me();
    uid = uid || (u && u.id);
    if (!uid) return;
    const title = !pseudo || (u && uid === u.id) ? X.pmTitle : X.pmOf(pseudo);
    openSheet(`<h3>${esc(title)}</h3><p class="hint">…</p>`);
    const r = await sb.rpc("palmares", { uid });
    if (r.error) { openSheet(`<h3>${esc(title)}</h3><p class="hint err">${esc(errMsg(r.error))}</p><div class="btns"><button onclick="closeSheet()">←</button></div>`); return; }
    const g = (r.data || []).sort((a, b) => (a.badge || 9) - (b.badge || 9) || b.played - a.played);
    openSheet(`<h3>${esc(title)}</h3>${g.length ? g.map((x) => `<div class="pmg"><div class="hd">
        <div class="bd ${x.badge ? "" : "no"}">${x.badge ? MEDAL[x.badge] : "🏅"}</div>
        <div style="flex:1;min-width:0"><b>${esc(x.game)}</b><div class="hint" style="margin:2px 0 0">${x.badge ? X.pmBadge + X.defended(x.defended) : X.pmNoBadge}</div>
          <div class="cnt"><span>🥇 ${x.gold}</span><span>🥈 ${x.silver}</span><span>🥉 ${x.bronze}</span><span style="color:var(--muted)">${X.pmPlayed(x.played)}</span></div></div></div>
        ${x.history && x.history.length ? `<details><summary>${X.pmHist}</summary>${x.history.map((h) => `<div class="hr"><span>${esc(h.title)} <small style="color:var(--muted)">${esc(fmtDate(h.date, { day: "numeric", month: "short", year: "numeric" }))}</small></span><b>${h.place && h.place <= 3 ? MEDAL[h.place] : X.pmPlace(h.place)}${h.score ? ` <small>${esc(h.score)}</small>` : ""}</b></div>`).join("")}</details>` : ""}
      </div>`).join("") : `<p class="hint">${X.pmNone}</p>`}<div class="btns" style="margin-top:12px"><button id="pmBack">←</button></div>`);
    document.getElementById("pmBack").onclick = back || closeSheet;
  }

  /* ---------- nav badge: my tournaments waiting for check-in + new events ---------- */
  let badgeN = 0;
  function paintBadge() {
    const u = me();
    let n = 0;
    if (u) for (const e of cache.values()) {
      const p = phaseOf(e);
      if (e.mine && !e.mine.waitlist && p === "checkin" && !e.mine.checked_in) n++;
    }
    let seen = 0; try { seen = +localStorage.getItem("kamei-ev-seen") || 0; } catch (e) {}
    const fresh = [...cache.values()].filter((e) => e.published_at && Date.parse(e.published_at) > seen && phaseOf(e) === "reg" && !e.mine).length;
    if (window.kameiNav && window.kameiNav.current && window.kameiNav.current() === "events") { try { localStorage.setItem("kamei-ev-seen", String(now())); } catch (e) {} }
    badgeN = n + (window.kameiNav && window.kameiNav.current && window.kameiNav.current() === "events" ? 0 : fresh);
    document.querySelectorAll('[data-bdg="events"]').forEach((el) => (el.textContent = badgeN ? String(badgeN) : ""));
  }
  async function poll() {
    if (!sb || (window.kameiFeature && !window.kameiFeature("events"))) return;
    try {
      const r = await sb.rpc("event_list", { from_ts: new Date(now() - 86400000).toISOString(), to_ts: new Date(now() + 45 * 86400000).toISOString() });
      if (!r.error) for (const e of r.data || []) cache.set(e.id, e);
    } catch (e) {}
    paintBadge();
  }
  setTimeout(poll, 4000);
  setInterval(poll, 5 * 60000);

  window.kameiEvents = { render, detail, palmares, form, badge: () => badgeN, poll };
})();
