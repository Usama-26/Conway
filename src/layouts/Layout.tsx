import Head from 'next/head';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({children}: LayoutProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href={process.env.NEXT_PUBLIC_BACK_END_URL + '/css/custom.css'}
        />
      </Head>
      <header className="p-3 cstm_header" id="cstm_header">
        <button
          className="btn border text-white cstm_mobile_menu_toggle_button"
          // onClick="toggleMobileMenu('block')"
        >
          <i className="fas fa-bars"></i>
        </button>
        <a
          className="cstm_header_logo_container"
          id="cstm_header_logo_container"
        >
          <div id="cstm_header_logo_text" className="cstm_header_logo_text">
            {/* {{\App\Models\HtmlElement::getContent("Header Logo Text")}} */}
          </div>
          <div
            id="cstm_header_logo_image"
            className="cstm_header_logo_image"
          ></div>
        </a>
        {/* <ul id="cstm_header_navigation_container" className="cstm_header_navigation_container">
                    @foreach (\App\Models\Navigation::parents() as $navigation)
                    <li>
				@if (\App\Models\Navigation::children($navigation->view_id)->isEmpty())
                        <li>
                            <a href="{{ route(\App\Models\View::getViewRoute($navigation->view_id)) }}" className="nav-link px-2 cstm_header_navigation_element" >
                                {{\App\Models\View::getViewDescription($navigation->view_id)}}
                            </a>
                        </li>
                        @else
                        <a className="nav-link dropdown-toggle cstm_header_navigation_element" href="#" id="cstm_header_navigation_dropdown_toggle_link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{\App\Models\View::getViewDescription($navigation->view_id)}}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="cstm_header_navigation_dropdown_toggle_link">
                            <li>
                                <a id="cstm_header_navigation_dropdown_link" className="cstm_header_navigation_dropdown_link" href="{{ route(\App\Models\View::getViewRoute($navigation->view_id)) }}" className="nav-link px-2 text-black">
                                    {{\App\Models\View::getViewDescription($navigation->view_id)}}
                                </a>
                            </li>
						@foreach (\App\Models\Navigation::children($navigation->view_id) as $navigation)
                            <li>
                                <a id="cstm_header_navigation_dropdown_link" className="cstm_header_navigation_dropdown_link" href="{{ route(\App\Models\View::getViewRoute($navigation->view_id)) }}" className="nav-link px-2 text-black">
                                    {{\App\Models\View::getViewDescription($navigation->view_id)}}
                                </a>
                            </li>
                            @endforeach
                        </ul>
                        @endif
                    </li>
                    @endforeach
                </ul> */}
        {/* <select name="cstm_languages" id="cstm_languages" className="cstm_languages" onchange="changeLang(this)" value={{ app()-> getLocale()}} autocomplete="off">
                @foreach (\App\Models\Language::all() as $language)
                <option value="{{$language->code}}" @if(app()->getLocale() == $language->code) selected="selected" @endif >{{ $language-> name}}</option>
                    @endforeach
                </select> */}
        {/* @auth */}
        {/* <a href="{{ route('profile.index') }}" id="cstm_account_element_container" className="cstm_account_element_container">{{ auth()-> user() -> first_name. " " . auth()->user()->last_name}}</a>
                <div className="text-end">
                    <a href="{{ route('logout.perform') }}">
                        <div id="cstm_log_out_button" className="cstm_log_out_button">Logout</div>
                    </a>
                </div>
                @endauth
                @guest */}
        <div className="text-end">
          <Link href={'/auth/login'} className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link href={'/auth/register'} className="btn btn-warning">
            Sign-up
          </Link>
        </div>
        {/* @endguest */}
      </header>
      <main className="container-fluid mt-5">
        {/* @include('layouts.partials.breadcrumb', ['BC' => $BC ?? []]) */}
        <div className="row flex-nowrap w-100">
          {/* @if ($navBarSettings['type'] == 'right') */}
          {/* <div className="col-auto col-md-9 px-sm-2 px-0">
                        {children}
                    </div>
                    <div className="d-none d-md-block col">
                         @include('layouts.partials.side-navbar')
                    </div> */}
          {/* @elseif($navBarSettings['type'] == 'left') */}
          <div className="d-none d-md-block col-auto col-md-3 px-sm-2 px-0">
            {/* @include('layouts.partials.side-navbar') */}
          </div>
          <div className="col">{children}</div>
          {/* @endif */}
        </div>
      </main>
    </>
  );
}
