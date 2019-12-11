import React from "react";
import { connect } from "react-redux";
import { Divider, Message } from "semantic-ui-react";
import Cover from "../../../app/components/cover";
import { loadActivity } from "../../actions";
import "./styles.css";

class RecentActivity extends React.Component {
  componentDidMount() {
    this.props.loadActivity(this.props.username);
  }

  stringifyStars = value => {
    let stars = "★".repeat(value);
    if (value % 1) {
      stars += "½";
    }
    return stars;
  };

  getEntryType = type => {
    switch (type) {
      case "F":
        return "check circle";
      case "P":
        return "play circle";
      case "R":
        return "redo";
      case "S":
        return "plus";
      case "A":
        return "times circle";
      default:
        return null;
    }
  };

  render() {
    const { activity } = this.props;
    return (
      <React.Fragment>
        <Divider horizontal>Recent Activity</Divider>
        {activity.length > 0 ? (
          <div className="recent-wrapper">
            {activity.map((g, i) => {
              return <Cover key={i} imageId={g.game.cover_id} size="small" />;
            })}
            {[...Array(5 - activity.length)].map((_, i) => (
              <div key={i} className="placeholder" />
            ))}
          </div>
        ) : (
          <Message className="no-content">
            <p>{this.props.username} has not been playing much...</p>
          </Message>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activity: state.profile.activity
});

export default connect(mapStateToProps, { loadActivity })(RecentActivity);
