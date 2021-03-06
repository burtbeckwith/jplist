<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main"/>
		
		<asset:stylesheet src="jplist.min.css"/>
		
		<!-- Handlebars Templates Library: http://handlebarsjs.com -->
		<script src="http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.4/handlebars.min.js"></script>
		
		<asset:javascript src="jplist.min.js" />
		<script>
			$('document').ready(function () {

				var $list = $('#demo .list')
					, template = Handlebars.compile($('#jplist-template').html());

				//init jplist with php + mysql data source, json and handlebars template
				$('#demo').jplist({

					itemsBox: '.list'
					, itemPath: '.list-item'
					, panelPath: '.jplist-panel'

					//data source
					, dataSource: {

					type: 'server'
					, server: {

						//ajax settings
						ajax: {
							url: 'handler/index'
							, dataType: 'json'
							, type: 'POST'
							, cache: false
						}
					}

					//render function for json + templates like handlebars, xml + xslt etc.
					, render: function (dataItem, statuses) {
						$list.html(template(dataItem.content));
					}
				}

				});
			});
		</script>
	</head>
	<body>
		<div class="box">
			<div class="center">

				<div class="box text-shadow">
					<h1 class="h1-30-normal left">jPList with Groovy, Grails and MySQL</h1>
				</div>

				<div class="box text-shadow">
		
					<!-- handlebars template -->
					<script id="jplist-template" type="text/x-handlebars-template">
						{{#each this}}
											
							<div class="list-item box">	
								<div class="img left">
									<img src="{{image}}" alt="" title=""/>
								</div>
													
								<div class="block right">
									<p class="title">{{title}}</p>
									<p class="desc">{{description}}</p>
									<p class="like">{{likes}} Likes</p>
									<p class="theme">{{keyword1}}, {{keyword2}}</p>
								</div>
							</div>
												
						{{/each}}
					</script>

					<!-- description
					<div class="box">
						<p class="text-shadow" style="margin: 0 0 30px 0">
							Test......	
						</p>	
					</div>
					-->

					<!-- demo -->
					<div id="demo" class="box jplist">
										
						<!-- ios button: show/hide panel -->
						<div class="jplist-ios-button">
							<i class="fa fa-sort"></i>
							jPList Actions
						</div>
											
						<!-- panel -->
						<div class="jplist-panel box panel-top">						

							<!-- reset button -->
							<button 
								type="button" 
								class="jplist-reset-btn"
								data-control-type="reset" 
								data-control-name="reset" 
								data-control-action="reset">
								Reset &nbsp;<i class="fa fa-share"></i>
							</button>

							<div
								class="jplist-drop-down"
								data-control-type="drop-down"
								data-control-name="paging"
								data-control-action="paging">

								<ul>
									<li><span data-number="3"> 3 per page </span></li>
									<li><span data-number="5"> 5 per page </span></li>
									<li><span data-number="10" data-default="true"> 10 per page </span></li>
									<li><span data-number="all"> view all </span></li>
								</ul>
							</div>

							<div
								class="jplist-drop-down"
								data-control-type="drop-down"
								data-control-name="sort"
								data-control-action="sort">

								<ul>
									<li><span data-path="default">Sort by</span></li>
									<li><span data-path=".title" data-order="asc" data-type="text">Title A-Z</span></li>
									<li><span data-path=".title" data-order="desc" data-type="text">Title Z-A</span></li>
									<li><span data-path=".desc" data-order="asc" data-type="text">Description A-Z</span></li>
									<li><span data-path=".desc" data-order="desc" data-type="text">Description Z-A</span></li>
									<li><span data-path=".like" data-order="asc" data-type="number">Likes asc</span></li>
									<li><span data-path=".like" data-order="desc" data-type="number">Likes desc</span></li>
								</ul>
							</div>

							<!-- filter by title -->
							<div class="text-filter-box">
																				
								<!--[if lt IE 10]>
								<div class="jplist-label">Filter by Title:</div>
								<![endif]-->
													
								<input 
									data-path=".title" 
									data-button="#title-search-button"
									type="text" 
									value="" 
									placeholder="Filter by Title" 
									data-control-type="textbox" 
									data-control-name="title-filter" 
									data-control-action="filter"
								/>
													
								<button 
									type="button" 
									id="title-search-button">
									<i class="fa fa-search"></i>
								</button>
							</div>

							<!-- views -->
							<div 
								class="jplist-views" 
								data-control-type="views" 
								data-control-name="views" 
								data-control-action="views"
								data-default="jplist-list-view">
												   
								<button type="button" class="jplist-view jplist-list-view" data-type="jplist-list-view"></button>
								<button type="button" class="jplist-view jplist-grid-view" data-type="jplist-grid-view"></button>
							</div>
												
							<!-- preloader for data sources -->
							<div 
								class="jplist-hide-preloader jplist-preloader"
								data-control-type="preloader" 
								data-control-name="preloader" 
								data-control-action="preloader">
								<asset:image src="common/ajax-loader-line.gif" alt="Loading..." />
							</div>
									
							<!-- pagination results -->
							<div 
								class="jplist-label" 
								data-type="Page {current} of {pages}" 
								data-control-type="pagination-info" 
								data-control-name="paging" 
								data-control-action="paging">
							</div>
													
							<!-- pagination -->
							<div 
								class="jplist-pagination" 
								data-control-type="pagination" 
								data-control-name="paging" 
								data-control-action="paging">
							</div>	

						</div>
											 
						<!-- ajax content here -->   
						<div class="list box text-shadow"></div>
											
						<!-- no result found -->
						<div class="box jplist-no-results text-shadow align-center jplist-hidden">
							<p>No results found</p>
						</div>
											
						<!-- ios button: show/hide panel -->
						<div class="jplist-ios-button">
							<i class="fa fa-sort"></i>
							jPList Actions
						</div>
											
						<!-- panel -->
						<div class="jplist-panel box panel-bottom">						
																		
							<div 
								class="jplist-drop-down left" 
								data-control-type="drop-down" 
								data-control-name="paging" 
								data-control-action="paging"
								data-control-animate-to-top="true">
													
								<ul>
									<li><span data-number="3"> 3 per page </span></li>
									<li><span data-number="5"> 5 per page </span></li>
									<li><span data-number="10" data-default="true"> 10 per page </span></li>
									<li><span data-number="all"> view all </span></li>
								</ul>
							</div>
							<div 
								class="jplist-drop-down left" 
								data-control-type="drop-down" 
								data-control-name="sort" 
								data-control-action="sort"
								data-control-animate-to-top="true">
													
								<ul>
									<li><span data-path="default">Sort by</span></li>
									<li><span data-path=".title" data-order="asc" data-type="text">Title A-Z</span></li>
									<li><span data-path=".title" data-order="desc" data-type="text">Title Z-A</span></li>
									<li><span data-path=".desc" data-order="asc" data-type="text">Description A-Z</span></li>
									<li><span data-path=".desc" data-order="desc" data-type="text">Description Z-A</span></li>
									<li><span data-path=".like" data-order="asc" data-type="number">Likes asc</span></li>
									<li><span data-path=".like" data-order="desc" data-type="number">Likes desc</span></li>
								</ul>
							</div>
												
							<!-- pagination results -->
							<div 
								class="jplist-label" 
								data-type="{start} - {end} of {all}" 
								data-control-type="pagination-info" 
								data-control-name="paging" 
								data-control-action="paging">
							</div>
													
							<!-- pagination -->
							<div 
								class="jplist-pagination" 
								data-control-type="pagination" 
								data-control-name="paging" 
								data-control-action="paging"
								data-control-animate-to-top="true">
							</div>					
						</div>
					</div>
					<!-- end of demo -->

					</div>

				<div class="box share-this-section m-tb-20">
					<div class="right">
						<span class='st_facebook_vcount' displayText='Facebook'></span>
						<span class='st_twitter_vcount' displayText='Tweet'></span>
						<span class='st_googleplus_vcount' displayText='Google +'></span>
					</div>
				</div>

			</div>
		</div>
	</body>
</html>
