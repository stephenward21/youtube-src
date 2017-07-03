import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchbar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';



const apiKey = 'AIzaSyB4U3skUS1_tc0UUxidZyACWT8gge-6OXE'




class App extends Component{
	constructor(props) {
		super(props);
		
		this.state= { 
			videos: [],
			selectedVideo: null 
		};

		this.videoSearch('swiss mountain dogs');
	}

	videoSearch(term) {
		YTSearch({key: apiKey, term: term}, (videos) => {
			this.setState({ 
				videos: videos, 
				selectedVideo: videos[0]
			});
			// this.setState({videos: videos}); es5
		});
	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

		return(
			<div> 
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
					videos={this.state.videos} />
			</div>
		)
	}
};

ReactDOM.render(
	<App />, 
	document.querySelector('.container')
);