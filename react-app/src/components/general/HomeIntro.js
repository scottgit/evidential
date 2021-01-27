import React from 'react';
import {NavLink} from 'react-router-dom';
import {bookExamined, library} from '../../images/';

const HomeIntro = ({display}) => {
  return (
    <>
    { (display.main === "WELCOME" &&
      <div className="ev-welcome-intro">
        <img src={bookExamined} alt="Book with magnifiying glass" className="ev-home-book-examined" />
        <p>Evidential is here to help researchers understand and analyze written works&mdash;books, journal articles, essays, opinion pieces&mdash;whatever type of <strong>text</strong> that makes a <strong>claim</strong> and then tries to back it up with additional <strong>arguments</strong> (evidence).</p>

        <p>The purpose is to create a space to collaboratively <strong>rate</strong> the arguments against the claims in a text, building a body of metadata to <strong>profile</strong> how <em>much</em> a text covers a particular claim and its arguments, as well as how <em>effectively</em> it covers those things. Users here can (or will be able to in upcoming releases):</p>

        <ul>
          <li>Upload texts to be analyzed</li>
          <li>Edit those texts for any grammar or encoding issues prior to running an analysis (after which run, the text is locked from editing; this also includes Delete capability)</li>
          <li>Define claims to be applied in analysis against any text</li>
          <li>Define arguments supporting and rebutting to a claim</li>
          <li>Define "hit keys" (keywords) for a claim to assist in finding relevant portions of the text to analyze it's arguments against the claim</li>
          <li>(Upcoming) Perform an initial "hit key" analysis of a text, highlighting the keyword "hits" found in the text</li>
          <li>(Upcoming) Establish the relevant hits in the text.</li>
          <li>(Upcoming) Rate the "hits" for power and relevance to the arguments (supports) and counter arguments (rebuttals), such things as whether it is using facts or personal experience, deduction or induction, controlled testing or historical analysis, etc.</li>
          <li>(Upcoming) See profiles of texts that have been rated (as well as how "complete" that rating is)</li>
        </ul>

        <p>If you want to <NavLink to="/sign-up" exact={true}>join the community of analyzers</NavLink>, great! But even if not, still feel free to view the analysis work that has been done.</p>
        <div className="ev-home-crop-wrapper">
        <img  src={library} alt="broad view of a library" className="ev-home-library"/>
        </div>
      </div>
    ) || ( display.main === "HOME" &&
      <div className="ev-home-intro">
          {/* TODO Add an analysis view of the latest rated text when a user logs in */}
          <p>Great to have you back! Let's get to analyzing.</p>
      </div>
    )
    }
    </>
  )
}

export default HomeIntro
