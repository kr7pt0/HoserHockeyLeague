import React from 'react';
// import { Link } from 'react-dom';
import base from '../config';
import MatchupRecap from './MatchupRecap';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        name: '',
        image: ''
      },
      recap: {
        title: '',
        summary: '',
        image: '',
        intro: '',
        match_intro: '',
        standings: {
          team: {
            name: ''
          },
          points: ''
        },
        matchup_recap: {
          title: '',
          score: '',
          body: '',
          team_mvplvp: {
            team: {
              name: ''
            },
            body: ''
          }
        }
      }
    }
  }
    componentWillMount() {
      this.ref = base.syncState(`/posts`, {
        context: this,
        state: 'recap'
      })
    }

      submitRecap(e){
        e.preventDefault()
        console.log("clicked");

        const recap = {
          title: this.title.value,
          summary: this.summary.value,
          image: this.image.value,
          articleIntro: this.articleIntro.value,
          matchupIntro: this.matchupIntro.value,
          standings: {
            team: this.teamName.value,
            points: this.teamPoints.value,
          }
        }

        console.log(recap, "THE RECAP IS HERE")

        const newRecap = {...this.state.recap};
        const timeStamp = Date.now();

        newRecap[`recap-${timeStamp}`] = recap;

        this.setState({recap: newRecap})
      }

      componentDidUpdate(){
        console.log(this.state.recap, "test state");
      }

  render() {
    return(
      <div>
        <div className="admin-dashboard">
          <div className="admin-settings">
            <img src="http://placehold.it/50x50" alt="User" />
            <span>Welcome, User</span>
          </div>
        </div>
        <div className="admin-post">
          <form onSubmit={(e) => this.submitRecap(e)}>
            <div className="admin-article-dets">
              <div className="admin-article-desc">
                <label>Post Title</label>
                <input ref={(input) => this.title = input} type="text" placeholder="Week 1 Recap" />

                <label>Post Summary</label>
                <input ref={(input) => this.summary = input} type="text" name="Summary" placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
              </div>
              <div className="admin-article-image">
                <label>Post Image</label>
                <input ref={(input) => this.image = input} type="text" name="Article Image" accept="image/*" />

                <img src="http://placehold.it/300x150" alt="Article" />
                <span className="remove">Delete</span> <span>/</span> <span className="edit">Replace</span>
              </div>

              <div className="admin-article-content">
                <label>Post Intro</label>
                <textarea ref={(input) => this.articleIntro = input} type="text" name="Article Intro" />

                <label>Match Intro</label>
                <textarea ref={(input) => this.matchupIntro = input} type="text" name="Match Intro" />

                <div className="admin-article-standings">
                  <div className="standings-data">
                    <h3>Current Standings:</h3>
                    <label>Team:</label>
                    <select>
                      <option ref={(input) => this.teamName = input} value="The Kessel Run">The Kessel Run</option>
                    </select>

                    <label>Points:</label>
                    <input ref={(input) => this.teamPoints = input} type="text" name="Teams Points" />
                  </div>

                  <div className="standings-table">
                    <ol>
                      <li>
                        <div className="standings-table-team">The Kessel Run</div>
                        <div className="standings-table-edit">
                          <span className="edit">edit</span> <span>/</span> <span className="remove">X</span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <button>click me</button>
          </form>
        </div>

        <MatchupRecap />

      </div>
    )
  }
}

export default Admin;
