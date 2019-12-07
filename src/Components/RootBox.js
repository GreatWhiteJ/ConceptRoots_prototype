import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import NewVideo from "./NewVideo"
import DeleteVideo from "./DeleteVideo"
//import './Transcriptor.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "verticle",
    width: "100%",
    height: "100%"
  },
  bottom: {
    top: "auto",
    bottom: 0
  },
  sticky: {
    position: "-webkit-sticky" /* Safari */,
    position: "sticky",
    top: 70
  }
}));

export function RootBox(props) {
  const classes = useStyles();
  const [expls, setExpls] = useState([]);
  const [videoID, setVideoID] = useState(['There are no explanations in this root']);
  const [description, setDescription] = useState();
  const [dialog_open, setDialogOpen] = useState(false);
  const [delete_open, setDeleteOpen] = useState(false);

  useEffect(() => {
    let refresh;
    refresh = db
      .collection("Roots")
      .doc(props.match.params.rootID)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        setDescription(data.Description);
      });
    return refresh;
  }, [props.match.params]);

  useEffect(() => {
    let refresh;
    refresh = db.collection("Explanations").where("ParentID", "==", props.match.params.rootID).onSnapshot(snapshot => {
      const updated_expls = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        updated_expls.push({
          ID: doc.id,
          ParentID: data.ParentID,
          URL: data.URL,
          YouTubeID: data.YouTubeID
        });
      });
      setExpls(updated_expls);
      setVideoID(updated_expls[0].YouTubeID)
    });
    return refresh;
  }, [props.match.params]);


  return (
    <div
      className={classes.root}
      style={{
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%"
        }}
      >
        <Paper style={{ width: 400, marginTop: 40, padding: 10 }}>
          {description}
        </Paper>
      </div>
      <div
        className={classes.root}
        style={{
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        <div
          className={classes.sticky}
          id={videoID}
          style={{
            height: 300,
            width: 500,
            backgroundColor: "blue",
            margin: 40
          }}
        >
          {'videoID = ' +videoID}
          <a href="#vidMenue" style={{color: 'black'}}>Example headline</a>
        </div>
        <Paper
          style={{
            width: 500,
            margin: 40,
            padding: 10
            //height: 800
          }}
        >
          <div id={"videoTranscript" + videoID}>
          {'videoTranscriptID = videoTranscript' +videoID}
            <p/>
            Preparing for this talk has been scarier for me than preparing for
            LSD therapy. (Laughter) "Psychedelics are to the study of the mind
            what the microscope is to biology and the telescope is to
            astronomy." Dr. Stanislav Grof spoke those words. He's one of the
            leading psychedelic researchers in the world, and he's also been my
            mentor. Today, I'd like to share with you how psychedelics, when
            used wisely, have the potential to help heal us, help inspire us,
            and perhaps even to help save us. In the 1950s and 60s, psychedelic
            research flourished all over the world and showed great promise for
            the fields of psychiatry, psychology and psychotherapy, neuroscience
            and the study of mystical experiences. But psychedelics leaked out
            of the research settings and began to be used by the counterculture,
            and by the anti-Vietnam War movement. And there was unwise use. And
            so there was a backlash. And in 1970, the US government criminalized
            all uses of psychedelics, and they began shutting down all
            psychedelic research. And this ban spread all over the world and
            lasted for decades. and it was tragic, since psychedelics are really
            just tools, and whether their outcomes are beneficial or harmful
            depends on how they're used. Psychedelic means "mind-manifesting,"
            and it relates to drugs like LSD, psilocybin, mescaline, iboga and
            other drugs. When I was 18 years old, I was a college freshman, I
            was experimenting with LSD and mescaline, and these experiences
            brought me in touch with my emotions. And they helped me have a
            spiritual connection that unfortunately, my bar mitzvah did not
            produce. (Laughter) When I wanted to tease my parents, I would tell
            them that they drove me to psychedelics because my bar mitzvah had
            failed to turn me into a man. (Laughter) But most importantly,
            psychedelics gave me this feeling of our shared humanity, of our
            unity with all life. And other people reported that same thing as
            well. And I felt that these experiences had the potential to help be
            an antidote to tribalism, to fundamentalism, to genocide and
            environmental destruction. And so I decided to focus my life on
            changing the laws and becoming a legal psychedelic psychotherapist.
            (Applause) Now, half a century after the ban, we're in the midst of
            a global renaissance of psychedelic research. Psychedelic
            psychotherapy is showing great promise for the treatment of
            post-traumatic stress disorder, or PTSD, depression, social anxiety,
            substance abuse and alcoholism and suicide. Psychedelic
            psychotherapy is an attempt to go after the root causes of the
            problems, with just relatively few administrations, as contrasted to
            most of the psychiatric drugs used today that are mostly just
            reducing symptoms and are meant to be taken on a daily basis.
            Psychedelics are now also being used as tools for neuroscience to
            study brain function and to study the enduring mystery of human
            consciousness. And psychedelics and the mystical experiences they
            produce are being explored for their connections between meditation
            and mindfulness, including a paper just recently published about
            lifelong zen meditators taking psilocybin in the midst of a
            meditation retreat and showing long-term benefits and brain changes.
            Now, how do these drugs work? Modern neuroscience research has
            demonstrated that psychedelics reduce activity in what's known as
            the brain's default mode network. This is where we create our sense
            of self. It's our equivalent to the ego, and it filters all incoming
            information according to our personal needs and priorities. When
            activity is reduced in the default mode network, our ego shifts from
            the foreground to the background, and we see that it's just part of
            a larger field of awareness. It's similar to the shift that
            Copernicus and Galileo were able to produce in humanity using the
            telescope to show that the earth was no longer the center of the
            universe, but was actually something that revolved around the sun,
            something bigger than itself. For some people, this shift in
            awareness is the most important and among the most important
            experiences of their lives. They feel more connected to the world
            bigger than themselves. They feel more altruistic, and they lose
            some of their fear of death. Not all drugs work this way. MDMA, also
            known as Ecstasy, or Molly, works fundamentally different. And I'll
            be able to share with you the story of Marcela, who suffered from
            post-traumatic stress disorder from a violent sexual assault.
            Marcela and I were introduced in 1984, when MDMA was still legal,
            but it was beginning also to leak out of therapeutic circles.
            Marcela had tried MDMA in a recreational setting, and during that,
            her past trauma flooded her awareness and it intensified her
            suicidal feelings. During our first conversation, I shared that when
            MDMA is taken therapeutically, it can reduce the fear of difficult
            emotions, and she could help move forward past her trauma. I asked
            her to promise not to commit suicide if we were to work together.
            She agreed and made that promise. During her therapeutic sessions,
            Marcela was able to process her trauma more fluidly, more easily.
            And yet, she was able to tell that the rapist had told her that if
            she ever shared her story, he would kill her. And she realized that
            that was keeping her a prisoner in her own mind. So being able to
            share the story and experience the feelings and the thoughts in her
            mind freed her, and she was able to decide that she wanted to move
            forward with her life. And in that moment, I realized that MDMA
            could be very effective for treating PTSD. Now, 35 years later,
            after Marcela's treatment, she's actually a therapist, training
            other therapists to help people overcome PTSD with MDMA. Now, how
            does MDMA work? How did MDMA help Marcela? People who have PTSD have
            brains that are different from those of us who don't have PTSD. They
            have a hyperactive amygdala, where we process fear. They have
            reduced activity in the prefrontal cortex, where we think logically.
            And they have reduced activity in the hippocampus, where we store
            memories into long-term storage. MDMA changes the brain in the
            opposite way. MDMA reduces activity in the amygdala, increases
            activity in the prefrontal cortex and increases connectivity between
            the amygdala and the hippocampus to remit traumatic memories to move
            into long-term storage. Recently, researchers at Johns Hopkins
            published a paper in "Nature," in which they demonstrated that MDMA
            releases oxytocin, the hormone of love and nurturing. The same
            researchers also did studies in octopuses, who are normally asocial,
            unless it's mating season. But lo and behold, you give them MDMA,
            and they become prosocial. (Laughter) Several months after Marcela
            and I worked together, the Drug Enforcement Administration moved to
            criminalize Ecstasy, having no knowledge of its therapeutic use. So
            I went to Washington, and I went into the headquarters of the Drug
            Enforcement Administration, and I filed a lawsuit demanding a
            hearing, at which psychiatrists and psychotherapists would be able
            to present information about therapeutic use of MDMA to try to keep
            it legal. And in the middle of the hearing, the DEA freaked out,
            declared an emergency and criminalized all uses of MDMA. And so the
            only way that I could see to bring it back was through science,
            through medicine and through the FDA drug development process. So in
            1986, I started MAPS as a nonprofit psychedelic pharmaceutical
            company. It took us 30 years, till 2016, to develop the data that we
            needed to present to FDA to request permission to move into the
            large-scale Phase 3 studies that are required to prove safety and
            efficacy before you get approval for prescription use. Tony was a
            veteran in one of our pilot studies. According to the Veterans
            Administration, there's over a million veterans now disabled with
            PTSD. And at least 20 veterans a day are committing suicide, many of
            them from PTSD. The treatment that Tony was to receive was three and
            a half months long. But during that period of time, he would only
            get MDMA on three occasions, separated by 12, 90-minute non-drug
            psychotherapy sessions, three before the first MDMA session for
            preparation and three after each MDMA session for integration. We
            call our treatment approach "inner-directed therapy," in that we
            support the patient to experience whatever's emerging within their
            minds or their bodies. Even with MDMA, this is hard work. And a lot
            of our subjects have said, "I don't know why they call this
            Ecstasy." (Laughter) During Tony's first MDMA session, he lay on the
            couch, he had eyeshades on, he listened to music, and he would speak
            to the therapists, who were a male-female co-therapy team, whenever
            he felt that he needed to. After several hours, in a moment of
            calmness and clarity, Tony shared that he had realized his PTSD was
            a way of connecting him to his friends. It was a way of honoring the
            memory of his friends who had died. But he was able to shift and see
            himself through the eyes of his dead friends. And he realized that
            they would not want him to suffer, to squander his life. They would
            want him to live more fully, which they were unable to do. And so he
            realized that there was a new way to honor their memory, which was
            to live as fully as possible. He also realized that he was telling
            himself a story that he was taking opiates for pain. But actually,
            he realized, he was taking them for escape. So he decided he didn't
            need the opiates anymore, he didn't need the MDMA anymore, and he
            was dropping out of the study. That was seven years ago. Tony is
            still free of PTSD, has never returned to opiates and is helping
            others less fortunate than himself in Cambodia. (Applause) The data
            that we presented to FDA from 107 people in our pilot studies,
            including Tony, showed that 23 percent of the people that received
            therapy without active MDMA no longer had PTSD at the end of
            treatment. This is really pretty good for this patient population.
            However, when you add MDMA, the results more than double, to 56
            percent no longer having PTSD. (Applause) But most importantly, once
            people learn that if they don't need to suppress their trauma, but
            they can process it, they keep getting better on their own. So at
            the 12-month follow-up one year after the last treatment session,
            two-thirds no longer have PTSD. And of the one-third that do, many
            have clinically significant reductions in symptoms. (Applause) On
            the basis of this data, the FDA has declared MDMA-assisted
            psychotherapy for PTSD a breakthrough therapy. FDA has also declared
            psilocybin a breakthrough therapy for treatment-resistant depression
            and just recently approved esketamine for depression. I'm proud to
            say that we have now initiated our Phase 3 studies. And if the
            results are as we hope, and if they're similar to the Phase 2
            studies, by the end of 2021, FDA will approve MDMA-assisted
            psychotherapy for PTSD. If approved, the only therapists who will be
            able to directly administer it to patients are going to be
            therapists that have been through our training program, and they
            will only be able to administer MDMA under direct supervision in
            clinic settings. We anticipate that over the next several decades,
            there will be thousands of psychedelic clinics established, at
            which, therapists will be able to administer MDMA, psilocybin,
            ketamine and other psychedelics to potentially millions of patients.
            These clinics can also evolve into centers where people can come for
            psychedelic psychotherapy for personal growth, for couples therapy
            or for spiritual, mystical experiences. Humanity now is in a race
            between catastrophe and consciousness. The psychedelic renaissance
            is here to help consciousness triumph. And now, if you all just look
            under your seats ... Just joking! (Laughter) Thank you. (Applause)
            (Laughter) (Applause) Thank you. (Applause) Corey Hajim: You've got
            to stay up here for a minute. Thank you so much, Rick. I guess it's
            a supportive audience. Rick Doblin: Yes, very. Many of them have
            also been to Burning Man. (Laughter) CH: There's some synergy. RD:
            (Laughs) CH: So, in your talk, you talked about using these drugs to
            address some pretty serious traumas. So what about some more common
            mental illnesses like anxiety and depression, and is that where
            microdosing comes in? RD: Well, microdosing can be helpful for
            depression, I do know someone that has been using it. But in
            general, for therapeutic purposes, we prefer macro-dosing rather
            than microdosing, in order to really help people deal with the root
            causes. Microdosing is more for creativity, for artistic
            inspiration, for focus ... And it also does have a mood-elevation
            lift. But I think for serious illnesses, we'd rather not get people
            thinking that they need a daily drug, but do more deeper, intense
            work. CH: And what about outside the United States and North
            America, is this research being done there? RD: Oh yeah, we're
            globalizing. Our Phase 3 studies are actually being done in Israel,
            Canada and the United States. So once we get approval in FDA, it
            will also become approved in Israel and in Canada. We're just
            starting research in Europe. And we're actually going to be training
            some therapists from China. CH: That's great. We were going to do an
            audience vote to see if people felt like this was a good idea to
            move forward with this research or not, but I have a feeling I know
            the answer to that, so ... Thank you so much, Rick. RD: Thank you.
            Thank you all. (Applause)
          </div>
        </Paper>
      </div>
      <div
        className={classes.bottom}
        id="vidMenue"
        style={{
          display: "flex",
          width: "100%",
          // backgroundColor: "gray",
          padding: 30,
          justifyContent: "space-around",
          height: 100,
          marginTop: 10
        }}
      >
        <Button color="primary" variant="contained" onClick={() => {
              setDialogOpen(true)}}>Add Video</Button>
        {expls.map(value => {
          return (
            <ListItem
              key={value.id}
              role={undefined}
              dense
              button
              onClick={()=>{setVideoID(value.YouTubeID)}}
              to={"/app/" + value.id + "/"}
            >
              <img
                src={"https://img.youtube.com/vi/" + value.YouTubeID + "/1.jpg"}
                alt="Girl in a jacket"
              />
            </ListItem>
          );
        })}
        <Button color="primary" variant="contained" onClick={() => {
              setDeleteOpen(true)}}>Delete Current Video</Button>
      </div>
      <NewVideo
        open={dialog_open}
        user={props.user}
        rootID={props.match.params.rootID}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
      <DeleteVideo
        open={delete_open}
        user={props.user}
        rootID={props.match.params.rootID}
        videoID={videoID}
        onClose={() => {
          setDeleteOpen(false);
        }}
      />
    </div>
  );
}
