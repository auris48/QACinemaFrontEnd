import React from "react";
import { ReactDOM } from "react";
import "../components/CSS/Classifications.css";

function Classifications() {
  return (
    <div className="PG">
      <div className="Css">
        <div>
          <h1 className="title_text"> Film Classifications </h1>
        </div>
        <div className="cards">
          <Card
            img="https://th.bing.com/th/id/OIP.obYFjevllLvdphYAk4MO3wHaF8?pid=ImgDet&rs=1"
            title="Parental Guidence"
            link="https://rating-system.fandom.com/wiki/PG_(BBFC)"
            description="PG stands for parental guidance and these movies are at times more
      intense comparted to a U rated film. PG films might include some
      sensitive topics, such as racism or bullying, but not in a negative
      way that condones such behaviour rather the opposite. Any bad language
      is mild, and there may be mild innuendo and references to sex."
          />

          <Card
            img="https://e7.pngegg.com/pngimages/651/283/png-clipart-queen-s-film-theatre-cinema-british-board-of-film-classification-others-thumbnail.png"
            title="Universe"
            link="https://rating-system.fandom.com/wiki/U_(BBFC)"
            description=" The U stands for universal and it refers to movies suitable for most
        ages. These movies should be in a positive tone and there should be
        clear differences between what is correct and incorrect. There should
        be no dangerous behaviour that children can copy and, at most, there
        may be occasional very mild bad language."
          />

          <Card
            img="https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0018/0844/brand.gif?itok=7bNXZlkb"
            title="Age 12A"
            link="https://rating-system.fandom.com/wiki/12_and_12A_(BBFC)"
            description="The 12A rating only applies to films shown in cinemas. This means a
        child under the age of 12 must be accompanied by a grown-up. The 12
        rating is used for DVDs and video-on-demand and cannot be sold or
        rented to anyone under the age of 12. Bad behaviour along with use of
        weapons may be included in these movies but should not be shown as
        attractive and should not be glamorised. Moderate bad language, and
        sometimes strong language depending on the context, may be used. Sex
        scenes should be short and discreet."
          />

          <Card
            img="https://movielabs.com/md/ratings/v2.3.2/html/imageCache/GB_BBFC_15-150px.jpg"
            title="Age 15"
            link="https://rating-system.fandom.com/wiki/15_(BBFC)"
            description="This rating reflects the fact that although teenagers are often aware
        of many adult topics, there is still some content that is too 'raw'
        and may be unsuitable. Behaviour such as suicide and self harm may be
        inlcuded but not in great detail. Use of illegal drugs may be shown
        but should not be promoted, and strong language is permissable. Sex
        scenes may be included but not excessively or explicitly. Strong
        violence is allowed but it cannot dwell on causing pain or injury."
          />

          <Card
            img="https://th.bing.com/th/id/R.85b770bfc5389786de97f0fa77e043bf?rik=NAdc2cZ1qSMksg&riu=http%3a%2f%2fichef.bbci.co.uk%2fnews%2f976%2fcpsprodpb%2f1BBE%2fproduction%2f_85020170_c78dd2d8-b8c8-4f3d-ae21-d8ef185ec7e2.jpg&ehk=2C5t9377vZE7gC7EW5ZBe7%2bKVAeTpH4fLSLkQ9QaIxE%3d&risl=&pid=ImgRaw&r=0"
            title="Age 18"
            link="https://rating-system.fandom.com/wiki/18_(BBFC)"
            description="This rating signals that a movie's content may be very graphic and
        should not be watched by anyone under the age of 18. The film may
        include very strong language, explicit sex scenes and strong violence."
          />
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="card">
      <div className="card_body">
        <img src={props.img} class="card_image" />
        <h2 className="card_title">{props.title}</h2>

        <p className="card_description">{props.description}</p>
      </div>
      <div className="card btn">
        <a href={props.link}>
          <button>Read more</button>
        </a>
      </div>
    </div>
  );
}

export default Classifications;
