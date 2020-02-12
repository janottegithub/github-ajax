$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
    let username = e.target.value;   

    //make request to github
     $.ajax({
        url:'https://api.github.com/users/'+username,
        
        data:{
            client_id:'e98552460ee83a470a57',
            client_secret:'7c32656e70fd381c1da7cba726f2e8baff631432'
        }
     }).done(function(user){
        $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
            client_id:'e98552460ee83a470a57',
            client_secret:'7c32656e70fd381c1da7cba726f2e8baff631432',
            sort: 'created: asc',
            per_page: 5
        } 
        }).done(function(repos){
            $.each(repos, function(index, repo){
             $('#repos').append(`
             <div class="well my-1">
                    <div class="row">
                        <div class="col-md-7">
                            <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3">
                            <span class="badge  badge-info p-2 m-1">Forks:${repo.forks_count}</span>
                            <span class="badge  badge-warning p-2 m-1">watchers:${repo.watchers_count} </span>
                            <span class="badge  badge-dark p-2 m-1">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                            <a href="${repo.html_url}" target="blank" class="btn btn-dark">Repo Page</a>
                        </div>
                    </div>
             </div>
             `)
            })
        });
        $('#profile').html(`
        <div class="row">

                <div class="col-lg-3">
                    <div class="main-card">
                        <div class="card" width="100%">
                            <h5 class="card-title mx-auto mt-1">${user.name}</h5>
                            <img src="${user.avatar_url}" class="thumbnail avatar" alt="picture of ${user.name}">
                        </div>
                        <div class="card-body">
                            <p class="card-text">${user.email}</p>
                            <a href="${user.html_url}" class="btn btn-primary" target="blank">See ${user.name}'s profile.</a>
                        </div>
                    </div>
                </div>          
                <div class="col-lg-6 ml-5">
                    <span class="badge  badge-info p-2 m-1">Public Repos:${user.public_repos}</span>
                    <span class="badge  badge-warning p-2 m-1">Public gist:${user.public_gists} </span>
                    <span class="badge  badge-dark p-2 m-1">Followers ${user.followers}</span>
                    <span class="badge  badge-success p-2 m-1">Followers ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mt-3">
                <div class="row mx-1">
                    <h3 class="page-header">Latest Repos</h3>
                </div>
                <div class="row mx-1">
                    <div id="repos"></div>
                </div>
            </div>  
        </div>
      </div>

        `);
    });
    });  

});
